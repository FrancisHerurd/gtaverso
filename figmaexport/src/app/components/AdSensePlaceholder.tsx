import { useEffect, useRef } from 'react';

interface AdSensePlaceholderProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

/**
 * AdSense Placeholder Component
 * 
 * This is a placeholder for Google AdSense ads.
 * When you get approved by Google AdSense:
 * 
 * 1. Add your AdSense script to index.html:
 *    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
 *         crossorigin="anonymous"></script>
 * 
 * 2. Update the data-ad-client prop below with your publisher ID
 * 3. Set the data-ad-slot with the slot ID from your AdSense account
 * 4. The ads will automatically load when the component mounts
 */
export function AdSensePlaceholder({ 
  slot = 'XXXXXXXXXX', 
  format = 'auto',
  className = '' 
}: AdSensePlaceholderProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if AdSense is available
    if (typeof window !== 'undefined' && (window as any).adsbygoogle && adRef.current) {
      try {
        // Push the ad only if it hasn't been pushed yet
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  // Show placeholder until AdSense is configured
  const isAdSenseConfigured = false; // Change to true when you add your AdSense code

  if (!isAdSenseConfigured) {
    return (
      <div className={`bg-gray-900 border border-[#00FF41]/20 rounded-xl p-8 text-center ${className}`}>
        <p className="text-gray-400 text-sm uppercase tracking-wide mb-2">
          Publicidad
        </p>
        <div className="h-32 flex items-center justify-center bg-gray-800/50 rounded-lg">
          <div className="text-center">
            <p className="text-gray-600 mb-1">
              Espacio reservado para Google AdSense
            </p>
            <p className="text-gray-700 text-xs">
              Ver /src/app/components/AdSensePlaceholder.tsx para instrucciones
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Actual AdSense code (will be used when isAdSenseConfigured = true)
  return (
    <div className={`adsense-container ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

/**
 * Different AdSense ad formats you can use:
 * 
 * 1. Display Ads (responsive):
 *    <AdSensePlaceholder format="auto" />
 * 
 * 2. In-feed Ads (for article lists):
 *    <AdSensePlaceholder format="fluid" />
 * 
 * 3. In-article Ads (within content):
 *    <AdSensePlaceholder format="fluid" />
 * 
 * 4. Multiplex Ads (for related content):
 *    <AdSensePlaceholder format="auto" />
 */
