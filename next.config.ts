import type { NextConfig } from "next";

// Статический экспорт для GitHub Pages: проект-сайты обслуживаются
// с подпути /<имя-репозитория>/, поэтому basePath включается только
// при сборке для Pages (GITHUB_PAGES=true) — локальная разработка
// (`npm run dev`) продолжает работать на localhost:3000 без префикса.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "calorie-tracker";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
};

export default nextConfig;
