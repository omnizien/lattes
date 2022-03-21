import {EventEmitter, Injectable} from '@angular/core';
import {ethers, BigNumber} from 'ethers';
import {default as sub_cons} from '../constants/token-lists/sub_cons.json';
import {default as pop_cons} from '../constants/token-lists/pop_cons.json';
import { contract_address, provider, signer} from '../constants/constants';
import {pair_abi, factory_abi, routerV2_abi, contract_abi, pancakequoter, pancakeRouter_abi} from '../constants/abis/triangular.ABI';
import {pancake_address} from '../constants/addresses/addresses';
import {pancakeRouter} from '../constants/router/routers';
import {  _tokenAddress} from './bsscan';
import { from, Observable } from 'rxjs';
import { JsonEncoderService } from '../workers/json-encoder.service';
import { AppComponent } from '../app.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
// import { bsscan, } from '../interfaces/tri_interface';

 //
 
export let pancakePairPrice1: number = 0;
export let pancakePairPrice2: number = 0;
export let pancakePairPrice3: number = 0;
export let pancakeSwapTokenName: string;

export let factory1 !: ethers.Contract;
export let factory2 !: ethers.Contract;
export let factory3 !: ethers.Contract;
 

type MapType = { 
    [id: string]: string; 
}
export let pancakeTokenMap: MapType = {};  
 
@Injectable({providedIn: 'root'})
export class PancakeService {
    gas_price !: ethers.BigNumber;

 


    reserve : any;
    invokePair !: ethers.Contract;
    // reserve0 : number = 0;
    // reserve1 : number = 0;

    Mouter !: ethers.Contract;
    cumulative : number = 0;


    shouldStart : boolean = false;

    max_from_pairs : number = 0;

    tokenAddress0 : string = '';
    tokenAddress1 : string = '';

    token0Name : string = "";
    token1Name : string = "";
    token2Name: string = "";

    _pancakePairPrice: number = 0;
    
    loop: boolean = false;
     
    

    
    coin : string = "";
    constructor( ) {}
    switch1 = true;
    switch2 = true;
    switch3 = true;
//https://www.javatpoint.com/typescript-map#:~:text=TypeScript%20map%20is%20a%20new%20data%20structure%20added,value.%20We%20can%20create%20a%20map%20as%20below.
    public async conventionSwitch(ops : string) {
      
   
        switch (ops) {
             
            case 'wbnb':
       
                break;
            case 'shiba':
 
                break;
            case 'eth':
                  
                 factory3 = new ethers.Contract(pancake_address, factory_abi, signer);
                const getPair_3 = await factory3['getPair']( pop_cons.eth, pop_cons.busd ); // no fren
                this.invokePair = new ethers.Contract(getPair_3, pair_abi, signer);
         
                this.reserve = await this.invokePair['getReserves']();    
                  const  reserve0_2 = Number(ethers.utils.formatUnits(this.reserve[0], 18));
                const reserve1_2 = Number(ethers.utils.formatUnits(this.reserve[1], 18));

                 const quoteContract = new ethers.Contract('0x10ED43C718714eb63d5aA57B78B54704E256024E', pancakeRouter_abi, signer);
                const quotedAmountOut = await quoteContract['quote'](1, this.reserve[0], this.reserve[1]);
                const finale = Number(ethers.utils.formatUnits(quotedAmountOut, 0));
               const fin = finale - ((0.25 * finale) / 100); //fee
                console.log(fin);
                //  const quotera =  new ethers.Contract(quotedAmountOut, pancakequoter, signer);
                // console.log('quotedAmountOut');  
                // console.log(quotera) ;  
                
                // const balanceOftoken3 = 1;
                // const cumulativeOf_token3 = reserve1_2 / reserve0_2 ;
                // console.log(cumulativeOf_token3 );
                // const cumulativeWithBalanceOf_token3 = cumulativeOf_token3 * balanceOftoken3;
                // pancakePairPrice3 = cumulativeWithBalanceOf_token3 ; // 0.30% fee


                // const quotedAmountOut = await this.factory3.callStatic['quoteExactInputSingle'](
                //     tokenIn,
                //     tokenOut,
                //     fee,
                //     amountIn.toString(),
                //     0
                //   );



               // pancakeTokenMap['eth'] = (pancakePairPrice3.toString());
                //console.log(pancakeTokenMap)
                // pancakePairPrice3 = this._pancakePairPrice;
            
 
 
                break;
            default:
                console.log('Invalid operator');
        }   

          var line = new LineChartComponent();
        
         line.lineChart(pancakePairPrice1,pancakePairPrice2,pancakePairPrice3 );
        
        
    }

  
 
 
    async router() {
        this.Mouter = new ethers.Contract(pancakeRouter, routerV2_abi, signer);
    }

}

// export const getPriceOnUniV3 = async (
//     tokenIn: string,
//     tokenOut: string,
//     amountIn: BigNumber,
//     fee: number
//   ): Promise<BigNumber> => {
//     const quotedAmountOut = await  factory3.callStatic.quoteExactInputSingle(
//       tokenIn,
//       tokenOut,
//       fee,
//       amountIn.toString(),
//       0
//     );
//     if (!ethers.BigNumber.isBigNumber(quotedAmountOut)) {
//       return getBigNumber(0);
//     }
//     return quotedAmountOut;
//   };
