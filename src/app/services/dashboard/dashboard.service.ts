import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { DatabaseService } from '../database.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private _allProductionYear = new BehaviorSubject<any>(null)
  private _allCompositionChart = new BehaviorSubject<any>(null)
  private _allPlantProduction = new BehaviorSubject<any>(null)
  private _allCurahhariHujan = new BehaviorSubject<any>(null)
  private _allProtas = new BehaviorSubject<any>(null)
  private _allTotalBunch = new BehaviorSubject<any>(null)
  private _allABW = new BehaviorSubject<any>(null)

  constructor(private api : DatabaseService) { }

  get allProductionYear(){
    return this._allProductionYear.asObservable();
  }

  get allCompositionChart(){
    return this._allCompositionChart.asObservable();
  }
  get allPlantProduction(){
    return this._allPlantProduction.asObservable();
  }
  get allCurahhariHujan(){
    return this._allCurahhariHujan.asObservable();
  }
  get allProtas(){
    return this._allProtas.asObservable();
  }

  get allTotalBunch(){
    return this._allTotalBunch.asObservable();
  }
  get allABW(){
    return this._allABW.asObservable();
  }

  async getCompositionChart(plantation_id : number, year : number){
    try{
      let compositionData : any = this.api.getCompositionChart(plantation_id, year).then(async (params:any) => {
        const data = JSON.parse(params)
        await this._allCompositionChart.next(data.data.plant_compositions)
      })
    } catch(error){
      console.log(error)
      throw(error)
    }
  }
  async getProductionYear(plantation_id : number): Promise<any>{
    try{
      let productionYear : any = this.api.getProductionYear(plantation_id).then(async (params:any) => {
        const data = JSON.parse(params)
        await this._allProductionYear.next(data.data.production_years)
      })
    } catch (error){
      console.log(error)
      throw(error)
    }
  }

  async getPlantProduction(plantation_id : number, year : number) : Promise<any>{
    try {
      let plantProduction : any = this.api.getPlantProductionChart(plantation_id, year).then(async (params:any) => {
        const data = JSON.parse(params)
        await this._allPlantProduction.next(data.data.plant_production)
      })
    } catch (error){
      console.log(error)
      throw(error)
    }
  }

  async getCurahHariHujan(plantation_id: number , year : number) : Promise<any>{
    try {
      let curahhariHujan : any = this.api.getRainFall(plantation_id, year).then(async (params : any) =>{
        const data = JSON.parse(params)
        await this._allCurahhariHujan.next(data.data.rainfall_chart)
      } )
    } catch (error){
      console.log(error)
      throw(error)
    }
  }

  async getAllProtas(plantation_id: number, year : number) : Promise<any>{
    try {
      let protas : any = this.api.getProtas(plantation_id, year).then( async (params : any) => {
        const data = JSON.parse(params)
        await this._allProtas.next(data.data.productivity_chart)
      })
    } catch (error) {
      console.log(error)
      throw(error)
    }
  }

  async getAllTotalBunch(plantation_id: number, year : number) : Promise<any>{
    try {
      let protas : any = this.api.getTotalBunch(plantation_id, year).then( async (params : any) => {
        const data = JSON.parse(params)
        await this._allTotalBunch.next(data.data.total_bunch_per_trees)
      })
    } catch (error) {
      console.log(error)
      throw(error)
    }
  }

  async getAllABW(plantation_id: number, year : number) : Promise<any>{
    try {
      let protas : any = this.api.getAllABW(plantation_id, year).then( async (params : any) => {
        const data = JSON.parse(params)
        await this._allABW.next(data.data.awb_chart)
      })
    } catch (error) {
      console.log(error)
      throw(error)
    }
  }

}
