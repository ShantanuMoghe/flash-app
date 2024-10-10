import { IVocab } from "./IVocab";

export interface IChapter {
    chapterNumber: number;
    chapterName?: string;
    imageUrl?: string;
    vocabList: IVocab[];
}