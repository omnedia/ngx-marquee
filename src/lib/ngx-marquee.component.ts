import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChildren, ElementRef, Input, QueryList } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'om-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ngx-marquee.component.html",
  styleUrl: "./ngx-marquee.component.scss",
})
export class NgxMarqueeComponent implements AfterViewInit {
  @ContentChildren('OmMarqueeContent') elementRefs?: QueryList<ElementRef<HTMLElement>>;

  @Input("styleClass")
  styleClass?: string;

  @Input('reverse')
  set reverse(reverse: boolean) {
    if (reverse) {
      this.style['--om-marquee-reverse'] = 'reverse';
      return;
    }

    this.style['--om-marquee-reverse'] = '';
  }

  @Input('animationDuration')
  set animationDuration(animationDuration: string) {
    this.style['--om-marquee-animation-duration'] = animationDuration;
  }

  @Input('marqueeGap')
  set marqueeGap(marqueeGap: string) {
    this.style['--om-marquee-gap'] = marqueeGap;
  }

  @Input('pauseOnHover')
  set pauseOnHover(pauseOnHover: boolean) {
    if (pauseOnHover) {
      this.style['--om-marquee-pause'] = 'paused';
      return;
    }

    this.style['--om-marquee-pause'] = 'running';
  }

  @Input('vertical')
  vertical = false;

  style: any = {};

  marqueeElements: SafeHtml[] = [];

  constructor(private readonly sanitizer: DomSanitizer) { }

  ngAfterViewInit(): void {
    if (!this.elementRefs) {
      return;
    }

    this.marqueeElements = this.elementRefs?.toArray().map((ref) => {
      return this.sanitizer.bypassSecurityTrustHtml(ref.nativeElement.outerHTML)
    });
  }
}