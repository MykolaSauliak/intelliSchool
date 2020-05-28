export interface IQuestion {
    question: string;
    answers: string[];
    sentence:string;
    correctIndex: number;
    jumpToTime: number;
}

export interface IAnswered {
    questionNumber: number;
    answerNumber: number;
}

export interface INotesContent {
    notes: string;
    summary: string;
}

export interface IUser {
    id: string;
    name: string;
}

export interface IRoom {
    id: string;
    title: string;
}

