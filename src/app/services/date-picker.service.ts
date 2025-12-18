import { Injectable } from '@angular/core';
import { DatePicker } from '@capacitor-community/date-picker';

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  async pickDate(currentValue?: string): Promise<string | null> {
    try {
      const options: any = {
        mode: 'date',
        format: 'yyyy-MM-dd',
        locale: 'cs-CZ',
        theme: 'light'
      };

      if (currentValue) {
        options.date = currentValue.split('T')[0];
      }

      const result = await DatePicker.present(options);
      return result.value ? `${result.value}T12:00:00.000Z` : null;
    } catch (error) {
      console.log('Picker zrušen', error);
      return null;
    }
  }
}