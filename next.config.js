/*
 * @Author: Allen OYang
 * @Email:  allenwill211@gmail.com
 * @Date: 2023-04-24 14:54:13
 * @LastEditTime: 2023-04-27 15:44:19
 * @LastEditors: Allen OYang allenwill211@gmail.com
 * @FilePath: /nova-gpt/next.config.js
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  output: 'standalone',
}

module.exports = nextConfig
