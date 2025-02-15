export const convertToSerializableObject = (leanDoc) =>{
    for(const key of Object.keys(leanDoc)){
        if(leanDoc[key].toJSON && leanDoc[key].toString){
            leanDoc[key] = leanDoc[key].toString();
        }
    }

    return leanDoc;
}