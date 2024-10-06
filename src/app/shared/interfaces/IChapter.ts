import { IVocab } from "./IVocab";

export interface IChapter {
    chapterNumber: number;
    chapterName?: string;
    vocabList: IVocab[];
}