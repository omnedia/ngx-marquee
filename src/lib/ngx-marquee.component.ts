import {CommonModule, isPlatformBrowser} from "@angular/common";
import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  ViewChild,
} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: "om-marquee",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ngx-marquee.component.html",
  styleUrl: "./ngx-marquee.component.scss",
})
export class NgxMarqueeComponent implements AfterViewInit, OnDestroy {
  @ViewChild("OmMarquee") marqueeRef!: ElementRef<HTMLElement>;

  @ContentChildren("OmMarqueeContent") elementRefs?: QueryList<
    ElementRef<HTMLElement>
  >;

  @Input("styleClass")
  styleClass?: string;

  @Input("reverse")
  set reverse(reverse: boolean) {
    if (reverse) {
      this.style["--om-marquee-reverse"] = "reverse";
      return;
    }

    this.style["--om-marquee-reverse"] = "";
  }

  @Input("animationDuration")
  set animationDuration(animationDuration: string) {
    this.style["--om-marquee-animation-duration"] = animationDuration;
  }

  @Input("marqueeGap")
  set marqueeGap(marqueeGap: string) {
    this.style["--om-marquee-gap"] = marqueeGap;
  }

  @Input("pauseOnHover")
  set pauseOnHover(pauseOnHover: boolean) {
    if (pauseOnHover) {
      this.style["--om-marquee-pause"] = "paused";
      return;
    }

    this.style["--om-marquee-pause"] = "running";
  }

  @Input("vertical")
  vertical = false;

  style: any = {};

  marqueeElements: SafeHtml[] = [];

  isInView = false;
  private intersectionObserver?: IntersectionObserver;

  constructor(
    private readonly sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
  }

  ngAfterViewInit(): void {
    this.getMarqueeContent();

    this.elementRefs?.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.getMarqueeContent();
    });

    if (isPlatformBrowser(this.platformId)) {
      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          if (!this.isInView) {
            this.isInView = true;
          }
        } else if (this.isInView) {
          this.isInView = false;
        }
      });
      this.intersectionObserver.observe(this.marqueeRef.nativeElement);
    }
  }

  destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  private getMarqueeContent(): void {
    if (!this.elementRefs) {
      return;
    }

    this.marqueeElements = this.elementRefs?.toArray().map((ref) => {
      return this.sanitizer.bypassSecurityTrustHtml(
        ref.nativeElement.outerHTML
      );
    });
  }
}
