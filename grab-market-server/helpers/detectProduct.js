

const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const fs = require('fs');


module.exports = function detectProduct(url, callback){
    const image = fs.readFileSync(url);
    const input = tf.node.decodeImage(image, 3);
    //console.log(input);

    mobilenet.load().then((model) => {
        model.classify(input).then((result) => {
            console.log("모델 결과 전체:", result);
            callback(result[0].className);
        })
        .catch((err) => {
        console.error("모델 분류 중 에러:", err);
        callback("unknown"); // 에러시 기본값
  });
    });
}

