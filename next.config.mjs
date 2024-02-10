/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {
  output: "export",
  swcMinify: true,
  reactStrictMode: true,
  env: {
    GOOGLE_TRANSLATION_CONFIG: JSON.stringify({
      languages: [
        { title: "English", name: "en" },
        { title: "Hindi", name: "hi" },
        { title: "Español", name: "es" },
        { title: "Français", name: "fr" },
      ],
      defaultLanguage: "en",
    }),
  },
};

export default withPWA(nextConfig);
