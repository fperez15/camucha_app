import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'linkify',
  standalone: true
})
export class LinkifyPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string | SafeHtml): SafeHtml {

    if (text && typeof text !== 'string') {
      return text as SafeHtml;
    }

    if (typeof text === 'string') {
      if (!text) return this.sanitizer.bypassSecurityTrustHtml(''); // Si es vacío, retornamos un SafeHtml vacío
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const withLinks = text.replace(urlRegex, url => {
        return `<a href="${url}" target="_blank" class="chat-link">${url}</a>`;
      });
      const withLineBreaks = withLinks.replace(/\n/g, '<br>');
      return this.sanitizer.bypassSecurityTrustHtml(withLineBreaks);
    }

    return text;
  }
}
