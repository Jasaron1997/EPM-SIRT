interface TipoDeGeneracion {
    color: string;
    name: string;
    value: number;
  }
  
  interface TipoDePlanta {
    color: string;
    name: string;
    value: number;
  }
  
  interface sirtData {
    TipoDeGeneracion: TipoDeGeneracion[];
    TipoDePlanta: TipoDePlanta[];
    Fecha: string;
  }
  
  export type {sirtData,TipoDePlanta,TipoDeGeneracion}