import { Server } from "./presentation/Server";


(async() => {
  main();
})();

async function main(){
  Server.start();
}
