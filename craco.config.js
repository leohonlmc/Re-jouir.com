// craco.config.js
module.exports = {
  webpack: {
    module: {
      rules: [
        {
          test: /\.module\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                },
              },
            },
          ],
        },
      ],
    },
  },
};
