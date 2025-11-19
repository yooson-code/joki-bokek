// Konfigurasi untuk notifikasi
export const NOTIFICATION_CONFIG = {
  // WhatsApp Business API Configuration
  whatsapp: {
    // Gunakan Twilio, MessageBird, atau service WhatsApp lainnya
    // Untuk development, kami gunakan placeholder
    enabled: process.env.NEXT_PUBLIC_WHATSAPP_ENABLED === "true",
    apiKey: process.env.WHATSAPP_API_KEY,
    phoneNumber: process.env.WHATSAPP_PHONE_NUMBER,
  },

  // Gmail Configuration
  gmail: {
    enabled: process.env.NEXT_PUBLIC_GMAIL_ENABLED === "true",
    senderEmail: process.env.GMAIL_SENDER_EMAIL,
    appPassword: process.env.GMAIL_APP_PASSWORD,
    recipientEmail: process.env.GMAIL_RECIPIENT_EMAIL,
  },

  // Admin WhatsApp untuk menerima notifikasi
  adminWhatsApp: process.env.ADMIN_WHATSAPP_NUMBER,
};
