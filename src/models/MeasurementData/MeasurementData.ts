export interface MeasurementData {
    "ankle left circumference": number;
    "arm right length": number;
    "bicep right circumference": number;
    "calf left circumference": number;
    "chest circumference": number;
    "forearm right circumference": number;
    "head circumference": number;
    "height": number;
    "hip circumference": number;
    "inside leg height": number;
    "neck circumference": number;
    "shoulder breadth": number;
    "shoulder to crotch height": number;
    "thigh left circumference": number;
    "waist circumference": number;
    "wrist right circumference": number;
}

export interface MeasurementApiResponse {
    error_code: number;
    message: string;
    description: string | null;
    data: MeasurementData;
}