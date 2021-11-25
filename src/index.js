// AddTimestampPlugin.js

const HtmlWebpackPlugin = require('html-webpack-plugin');

class AddTimestampPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('AddTimestampPlugin', compilation => {
            HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
                'AddTimestampPlugin',
                (data, cb) => {
                    // 读取并修改 script 上 src 列表
                    let assets = JSON.parse(data.plugin.assetJson);
                    const jsScripts = assets.filter(item => /\.js$/.test(item));

                    data.bodyTags = data.bodyTags.filter(item => item.tagName !== 'script');

                    const suffix = '?' + new Date().getTime() + 'A404coder';
                    let result = jsScripts.map(item => `<script src="${item + suffix}"></script>`);
                    result = result.join('');

                    let resultHTML = data.html.replace('<!--AddTimestampPlugin inset script-->', result);
                    data.html = resultHTML;

                    cb(null, data);
                }
            );
        });
    }
}

module.exports = AddTimestampPlugin;
