export interface DeleteResult {
  acknowledged: boolean,
  deletedCount: number,
} 

export interface PatchResult {
    acknowledged: boolean,
    modifiedCount: number,
    upsertedId: any,
    upsertedCount: number,
    matchedCount: number
}