"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xwvnqqoj", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--gta-green)/20 text-(--gta-green)">
          <Send className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold text-white">¡Mensaje enviado!</h3>
        <p className="mt-2 text-gray-400">Gracias por contactarnos. Te responderemos pronto.</p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-(--gta-green) hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Tu Email
        </label>
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="tu@email.com"
          className="mt-2 block w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-(--gta-green) focus:outline-none focus:ring-1 focus:ring-(--gta-green) transition-all"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300">
          Mensaje
        </label>
        <textarea
          required
          name="message"
          id="message"
          rows={5}
          placeholder="Cuéntanos..."
          className="mt-2 block w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-(--gta-green) focus:outline-none focus:ring-1 focus:ring-(--gta-green) transition-all resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500">Hubo un error al enviar. Inténtalo de nuevo o escribe directamente al email.</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-(--gta-green) px-8 py-4 font-bold text-black transition-transform hover:scale-[1.02] hover:bg-[#00cc34] disabled:opacity-70 disabled:hover:scale-100"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar Mensaje"
        )}
      </button>
    </form>
  );
}