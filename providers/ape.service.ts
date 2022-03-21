import { EventEmitter, Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { default as sub_cons } from '../constants/token-lists/sub_cons.json';
import { default as pop_cons } from '../constants/token-lists/pop_cons.json';
import {  contract_address, provider,signer} from '../constants/constants';
import {pair_abi,factory_abi,routerV2_abi,contract_abi} from '../constants/abis/triangular.ABI';
import { ape_address } from '../constants/addresses/addresses';
import {  apeRouter } from '../constants/router/routers';
import { LastBlock, SafeGasPrice, ProposeGasPrice,FastGasPrice,BnbUsdPrice,_tokenAddress,token0price, bscscan } from './bsscan';
import { from, Observable } from 'rxjs';
import { JsonEncoderService } from '../workers/json-encoder.service';
 
 
// import { bsscan, } from '../interfaces/tri_interface';


export let apePairPrice1: number = 0;
export let apePairPrice2: number = 0;
export let apePairPrice3: number = 0;
export let apeSwapTokenName: string;

 

type MapType = { 
  [id: string]: string; 
}
export let apeTokenMap: MapType = {};  


@Injectable({
  providedIn: 'root',
})
export class ApeService {
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

    
 
  

  constructor(public _bscan: bscscan, public jsonEncoderServer:JsonEncoderService) {}

  public async conventionSwitch(ops: string) {
    apeSwapTokenName = ops;
    switch (ops) {
      case 'wbnb':
                this.tokenAddress0 = pop_cons.wbnb;
                this.tokenAddress1 = pop_cons.busd;
                apeSwapTokenName = 'wbnb';      
                this.factory1 = new ethers.Contract(ape_address, factory_abi, signer);
                const getPair = await this.factory1['getPair'](pop_cons.wbnb, pop_cons.busd); // no fren
                this.invokePair = new ethers.Contract(getPair, pair_abi, signer);
                this.reserve = await this.invokePair['getReserves']();
                this.reserve0 = Number(ethers.utils.formatUnits(this.reserve[0], 18));
                this.reserve1 = Number(ethers.utils.formatUnits(this.reserve[1], 18));
                const balanceOf = 1;
                const cumulative = this.reserve1 / this.reserve0;
                const withBalanceOf = cumulative * balanceOf;
                this._apePairPrice = withBalanceOf - (0.2 * withBalanceOf) / 100; // 0.30% fee
                apeTokenMap['wbnb'] = (apePairPrice1.toString());
                console.log(apeTokenMap)
                 apePairPrice1 = this._apePairPrice;
                  console.log(" apePairPrice1 " +  apePairPrice1);
            
            
            
                  // this.switch1 = false;
                // while (this.switch1 == true || apePairPrice1 != 0 && apePairPrice1 != (apePairPrice2 || apePairPrice3)) {
                    
                //     apePairPrice1 = this._apePairPrice;
                //     console.log(" apePairPrice1 " +  apePairPrice1);
                // }  ;
                    
 
                
                console.log("complete");
                break;
            case 'shiba':
 
                this.tokenAddress0 = sub_cons.shiba;
                this.tokenAddress1 = pop_cons.busd;
                apeSwapTokenName = 'shiba';    
                this.factory2 = new ethers.Contract(ape_address, factory_abi, signer);
                const getPair_2 = await this.factory2['getPair'](sub_cons.shiba,  pop_cons.busd); // no fren
                this.invokePair = new ethers.Contract(getPair_2, pair_abi, signer);
                this.reserve = await this.invokePair['getReserves']();
                this.reserve0 = Number(ethers.utils.formatUnits(this.reserve[0], 18));
                this.reserve1 = Number(ethers.utils.formatUnits(this.reserve[1], 18));
                const balanceOftoken2 = 1;
                const cumulativeOf_token2 = this.reserve1 / this.reserve0;
                const cumulativeWithBalanceOf_token2 = cumulativeOf_token2 * balanceOftoken2;
                apePairPrice2 = cumulativeWithBalanceOf_token2 - (0.3 * cumulativeWithBalanceOf_token2) / 100; // 0.30% fee
                apeTokenMap['shiba'] = (apePairPrice2.toString());
                console.log(apeTokenMap)
                 apePairPrice2 = this._apePairPrice;
                  console.log(" apePairPrice1 " +  apePairPrice2);
         
                // this.switch2 = false;

                // while (this.switch2 == true || apePairPrice2 != 0 && apePairPrice2 != (apePairPrice1 || apePairPrice3)  ) {
                   
 
                // }  ;             
 
                   
          
                break;
            case 'eth':
                this.tokenAddress0 = pop_cons.eth;
                this.tokenAddress1 = pop_cons.busd;
                apeSwapTokenName = 'shiba';    
                this.factory3 = new ethers.Contract(ape_address, factory_abi, signer);
                const getPair_3 = await this.factory3['getPair'](pop_cons.eth,  pop_cons.busd); // no fren
                this.invokePair = new ethers.Contract(getPair_3, pair_abi, signer);
                this.reserve = await this.invokePair['getReserves']();
                this.reserve0 = Number(ethers.utils.formatUnits(this.reserve[0], 18));
                this.reserve1 = Number(ethers.utils.formatUnits(this.reserve[1], 18));
                const balanceOftoken3 = 1;
                const cumulativeOf_token3 = this.reserve1 / this.reserve0;
                const cumulativeWithBalanceOf_token3 = cumulativeOf_token3 * balanceOftoken3;
                apePairPrice3 = cumulativeWithBalanceOf_token3 - (0.3 * cumulativeWithBalanceOf_token3) / 100; // 0.30% fee
                apeTokenMap['eth'] = (apePairPrice3.toString());
                console.log(apeTokenMap)
                 apePairPrice3 = this._apePairPrice;
                  console.log(" apePairPrice1 " +  apePairPrice3);
            // this.switch3 = false;
                // while (this.switch3 == true || apePairPrice3 != 0 && apePairPrice3 != (apePairPrice1 || apePairPrice2)  ){
                        

                //   }  ; 
 
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
