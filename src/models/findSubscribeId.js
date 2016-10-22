import { SubscribeIdCollection } from './schema';

const findSubscribeId = () => {
  return new Promise(resolve => {
    let senderIdArr = [];
    SubscribeIdCollection.find().forEach(data => {
      senderIdArr.push(data);
    });
    console.log(senderIdArr);
    resolve(senderIdArr);
  });
};

export default findSubscribeId;
