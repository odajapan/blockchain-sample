# setup react
npx create-react-app client
cd client
npm init -y
cp -r ../templates/blockchain_react_app_template/ .

npm install --save ethers
# TODO create-react-appで生成した使わないファイルを削除
# npm start

cd ../
# setup hardhat
mkdir smart_contract
cd smart_contract
npm init -y
npm install --save-dev hardhat
npx hardhat
npm install --save-dev @nomicfoundation/hardhat-toolbox

cp -r ../templates/smart_contract_template/ .
# TODO 使わないファイルを削除


cd ../