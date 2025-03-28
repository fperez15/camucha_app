import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ImageAnalysisResponse {
  isFraudCase: boolean;
  message: string;
  nivel_riesgo: string;
  tips_seguridad: string[];
  enlaces: string[];
}

@Injectable({
  providedIn: 'root'
})
export class FraudDetectionService {
  constructor(private http: HttpClient) {}

  // Analizar imagen
  analyzeImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      'https://nestjs-openai-backend.vercel.app/gpt/image-analyze',
      formData,
      { headers: new HttpHeaders({ 'Accept': 'application/json' }) }
    );
  }

  // Analizar texto
  analyzeText(text: string): Observable<any> {
    return this.http.post<any>(
      'https://nestjs-openai-backend.vercel.app/gpt/text-analyze',
      { text },
      { headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      }
    );
  }

}
