declare type Lod = {
  show: () => void
  hide: () => void
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $loading: Lod
  }
}

export { }