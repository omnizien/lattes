import {EventEmitter, Injectable} from '@angular/core';
import {ethers} from 'ethers';
import {default as sub_cons} from '../constants/token-lists/sub_cons.json';
import {default as pop_cons} from '../constants/token-lists/pop_cons.json';
import { contract_address, provider, signer} from '../constants/constants';
import {pair_abi, factory_abi, routerV2_abi, contract_abi} from '../constants/abis/triangular.ABI';
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
 

type MapType = { 
    [id: string]: string; 
}
export let pancakeTokenMap: MapType = {};  
 
@Injectable({providedIn: 'root'})
export class PancakeService {
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
                this.tokenAddress0 = pop_cons.wbnb;
                this.tokenAddress1 = pop_cons.busd;
                pancakeSwapTokenName = 'wbnb';      
                this.factory1 = new ethers.Contract(pancake_address, factory_abi, signer);
                const getPair = await this.factory1['getPair'](pop_cons.wbnb, pop_cons.busd); // no fren
                this.invokePair = new ethers.Contract(getPair, pair_abi, signer);
                this.reserve = await this.invokePair['getReserves']();
                this.reserve0 = Number(ethers.utils.formatUnits(this.reserve[0], 18));
                this.reserve1 = Number(ethers.utils.formatUnits(this.reserve[1], 18));
                const balanceOf = 1;
                const cumulative = this.reserve1 / this.reserve0;
                const withBalanceOf = cumulative * balanceOf;
                this._pancakePairPrice = withBalanceOf - (0.2 * withBalanceOf) / 100; // 0.30% fee
                pancakeTokenMap['wbnb'] = (pancakePairPrice1.toString());
                console.log(pancakeTokenMap)
                 pancakePairPrice1 = this._pancakePairPrice;
                  console.log(" pancakePairPrice1 " +  pancakePairPrice1);
            
 
 
                
                console.log("complete");
                break;
            case 'shiba':
 
                this.tokenAddress0 = sub_cons.shiba;
                this.tokenAddress1 = pop_cons.busd;
                pancakeSwapTokenName = 'shiba';    
                this.factory2 = new ethers.Contract(pancake_address, factory_abi, signer);
                const getPair_2 = await this.factory2['getPair'](sub_cons.shiba,  pop_cons.busd); // no fren
                this.invokePair = new ethers.Contract(getPair_2, pair_abi, signer);
                this.reserve = await this.invokePair['getReserves']();
                this.reserve0 = Number(ethers.utils.formatUnits(this.reserve[0], 18));
                this.reserve1 = Number(ethers.utils.formatUnits(this.reserve[1], 18));
                const balanceOftoken2 = 1;
                const cumulativeOf_token2 = this.reserve1 / this.reserve0;
                const cumulativeWithBalanceOf_token2 = cumulativeOf_token2 * balanceOftoken2;
                pancakePairPrice2 = cumulativeWithBalanceOf_token2 - (0.3 * cumulativeWithBalanceOf_token2) / 100; // 0.30% fee
                pancakeTokenMap['shiba'] = (pancakePairPrice2.toString());
                console.log(pancakeTokenMap)
                pancakePairPrice2 = this._pancakePairPrice;
                
                  const calc =  (1.0 / pancakePairPrice2) 
                  console.log(" pancakePairPrice1 " +  pancakePairPrice2);
                // console.log(calc);
                // console.log(calc);
                // console.log(calc);
                // console.log(calc);
                // console.log(calc);
 
                   
          
                break;
            case 'eth':
                this.tokenAddress0 = pop_cons.eth;
                this.tokenAddress1 = pop_cons.busd;
                pancakeSwapTokenName = 'shiba';    
                this.factory3 = new ethers.Contract(pancake_address, factory_abi, signer);
                const getPair_3 = await this.factory3['getPair'](pop_cons.eth,  pop_cons.busd); // no fren
                this.invokePair = new ethers.Contract(getPair_3, pair_abi, signer);
                this.reserve = await this.invokePair['getReserves']();
                this.reserve0 = Number(ethers.utils.formatUnits(this.reserve[0], 18));
                this.reserve1 = Number(ethers.utils.formatUnits(this.reserve[1], 18));
                const balanceOftoken3 = 1;
                const cumulativeOf_token3 = this.reserve1 / this.reserve0;
                const cumulativeWithBalanceOf_token3 = cumulativeOf_token3 * balanceOftoken3;
                pancakePairPrice3 = cumulativeWithBalanceOf_token3 - (0.3 * cumulativeWithBalanceOf_token3) / 100; // 0.30% fee
                pancakeTokenMap['eth'] = (pancakePairPrice3.toString());
                console.log(pancakeTokenMap)
                 pancakePairPrice3 = this._pancakePairPrice;
                  console.log(" pancakePairPrice1 " +  pancakePairPrice3);
 
 
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
