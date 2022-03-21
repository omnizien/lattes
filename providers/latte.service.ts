import { EventEmitter, Injectable } from '@angular/core';
import { BigNumber, ethers } from 'ethers';
import { default as sub_cons } from '../constants/token-lists/sub_cons.json';
import { default as pop_cons } from '../constants/token-lists/pop_cons.json';
import {web3_socket, contract_address, provider, signer} from '../constants/constants';
import {pair_abi,factory_abi,routerV2_abi,contract_abi} from '../constants/abis/triangular.ABI';
import { latte_address,ape_address } from '../constants/addresses/addresses';
import {  apeRouter } from '../constants/router/routers';
import { LastBlock, SafeGasPrice, ProposeGasPrice,FastGasPrice,BnbUsdPrice,_tokenAddress,token0price, bscscan } from './bsscan';
import { from, Observable } from 'rxjs';
import { JsonEncoderService } from '../workers/json-encoder.service';
import { Fetcher, Token, TokenAmount,WNATIVE } from '@latteswap/sdk'
// const { mainnet: addresses } = require("./addresses");
 

 
 
 
 
// import { bsscan, } from '../interfaces/tri_interface';


export let lattePairPrice1: number = 0;
export let lattePairPrice2: number = 0;
export let lattePairPrice3: number = 0;
export let latteSwapTokenName: string;

// const oneEther = BigNumber.from("1000000000000000000");
// const AMOUNT_BUSD_WEI =  (ethers.utils.formatUnits(oneEther));
// const AMOUNT_BNB_WEI =   (ethers.utils.formatUnits(oneEther));


type MapType = { 
  [id: string]: string; 
}
export let apeTokenMap: MapType = {};  


@Injectable({
  providedIn: 'root',
})
export class LatteService {
       gas_price !: ethers.BigNumber;

      factory1 !: ethers.Contract;
      factory2 !: ethers.Contract;
      factory3 !: ethers.Contract;


      reserve : any;
      invokePair !: ethers.Contract;
      reserve0 : number = 0;
      reserve1 : number = 0;

      Mouter !: ethers.Contract;
      cumulative : number = 0;


      shouldStart : boolean = false;

      max_from_pairs : number = 0;

      tokenAddress0 : string = '';
      tokenAddress1 : string = '';

      token0Name : string = "";
      token1Name : string = "";
      token2Name: string = "";

      _apePairPrice: number = 0;
      
      loop: boolean = false;

    
 
  

  constructor(public _bscan: bscscan, public jsonEncoderServer: JsonEncoderService) { }
  


  public async conventionSwitch(ops: string) {
    latteSwapTokenName = ops;
    switch (ops) {
      case 'alpaca':
             

        this.factory1 = new ethers.Contract(latte_address, factory_abi, signer);
        console.log( this.factory1);
             const getPair = await this.factory1['getPair'](sub_cons.latte, pop_cons.busd); // no fren
                this.invokePair = new ethers.Contract(getPair, pair_abi, signer);
                this.reserve = await this.invokePair['getReserves']();
                this.reserve0 = Number(ethers.utils.formatUnits(this.reserve[0], 18));
                this.reserve1 = Number(ethers.utils.formatUnits(this.reserve[1], 18));
                const balanceOf = 1;
                const cumulative = this.reserve1 / this.reserve0;
                const withBalanceOf = cumulative * balanceOf;
                this._apePairPrice = withBalanceOf - (0.2 * withBalanceOf) / 100; // 0.30% fee
                apeTokenMap['wbnb'] = (lattePairPrice1.toString());
                console.log(apeTokenMap)
                 lattePairPrice1 = this._apePairPrice;
                  console.log(" apePairPrice1 " +  lattePairPrice1);
              
 
                
               console.log("complete");
                break;
            
            default:
                console.log('Invalid operator');
        }   
    // console.log('------------------------- ? ' + ops);
     
  }
  

  // public appGetTotalFighters(): Observable<any> {
  //   const source = from(this.contract.totalFighters());
  //   return source;
  // }

  //apply routers
  async router() {
    this.Mouter = new ethers.Contract(apeRouter, routerV2_abi, signer);
  }
 
}
