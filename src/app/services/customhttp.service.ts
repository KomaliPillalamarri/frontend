import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {

  private baseUrl = 'http://localhost:8082/api';

  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  private getHeaders() {
    const token = this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  async post<T>(url: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return response.json();
  }

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      headers: this.getHeaders(), 
    });

    if (!response.ok) {
      throw new Error('Failed to delete data');
    }
    return response.json();
  }

  async patch<T>(url: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }
    return response.json();
  }
}
