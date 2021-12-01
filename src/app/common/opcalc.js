

// export function getOpcalc() {
//     const results;
//     WebAssembly.instantiateStreaming(fetch('opcalc.wasm'), importObject)
//         .then(res => {
//             console.log('a gOP web assembly results: ', results);
//             results = res;
//         });
//     return results;
// } 

const opcalcPath = '../../../node_modules/opcalc/opcalc_bg.wasm';

export async function loadOpcalc() {
    const imports = {}; // Omitted the contents since it's most likely irrelevant
    const module = await WebAssembly.instantiateStreaming(fetch(opcalcPath), imports);
    return module;
  }
