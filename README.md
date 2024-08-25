# ngx-marquee

`@omnedia/ngx-marquee` is an Angular library that provides a customizable marquee component with animation controls for scrolling content horizontally or vertically. The component offers flexible configuration options such as animation speed, direction (horizontal or vertical), reverse mode, gap size, and an option to pause the marquee on hover.

## Features

- Customizable scrolling marquee with horizontal or vertical movement.
- Options for controlling animation speed, direction, and reverse scrolling.
- Supports pausing the marquee when hovered.
- Lightweight and easy to integrate as a standalone component.

## Installation

Install the library using npm:

```bash
npm install @omnedia/ngx-marquee
```

## Usage

Import the `NgxMarqueeComponent` in your Angular module or component:

```typescript
import { NgxMarqueeComponent } from '@omnedia/ngx-marquee';

@Component({
  ...
  imports: [
    ...
    NgxMarqueeComponent,
  ],
  ...
})
```

Use the component in your template:

```html
<om-marquee
  [reverse]="true"
  [animationDuration]="'10s'"
  [marqueeGap]="'2rem'"
  [pauseOnHover]="true"
  styleClass="custom-marquee"
>
  <div #OmMarqueeContent class="item">
    Item 1
  </div>
  <div #OmMarqueeContent class="item">
    Item 2
  </div>
  <div #OmMarqueeContent class="item">
    Item 3
  </div>
</om-marquee>
```

How It Works

- Customizable Direction and Animation: You can set the marquee to scroll content horizontally or vertically by setting the vertical input. You can also control the speed, gap between items, reverse the scroll direction, and pause the scroll when hovered.
- Global and Custom Styling: The .om-marquee container can be styled globally or with a custom styleClass. Content elements inside the marquee retain their parent component styling, allowing flexibility in their design.

## API

```html
<om-marquee
  [reverse]="reverse"
  [animationDuration]="animationDuration"
  [marqueeGap]="marqueeGap"
  [pauseOnHover]="pauseOnHover"
  [vertical]="vertical"
  styleClass="your-custom-class"
>
  <ng-content></ng-content>
</om-marquee>
```

- `reverse` (optional): A boolean to reverse the scroll direction. Defaults to false.
- `animationDuration` (optional): The duration of the scroll animation. Accepts any valid CSS time value (e.g., '20s', '10s').
- `marqueeGap` (optional): The gap between the marquee items. Accepts any valid CSS size value (e.g., '1rem', '2rem').
- `pauseOnHover` (optional): A boolean to pause the scroll animation when the marquee is hovered. Defaults to true.
- `vertical` (optional): A boolean to switch the marquee to vertical scrolling mode. Defaults to false.
- `styleClass` (optional): A custom CSS class to apply to the .om-marquee container for additional styling.

## Example

```html
<om-marquee [reverse]="false" [animationDuration]="'15s'" [marqueeGap]="'1rem'" styleClass="marquee-container">
  <div #OmMarqueeContent class="marquee-item">Item A</div>
  <div #OmMarqueeContent class="marquee-item">Item B</div>
  <div #OmMarqueeContent class="marquee-item">Item C</div>
</om-marquee>
```

This will create a marquee that scrolls content horizontally, with an animation duration of 15 seconds and a gap of 1 rem between each item.

## Styling
`.om-marquee`

- The main container for the marquee effect. You can apply global or custom styles using the styleClass input. The marquee content will automatically scroll in the specified direction based on the component's configuration.

### Example of Global and Custom Styling

In this example, the marquee container is customized with a background color and padding, while the items inside the marquee retain their original styles:

```html
<om-marquee styleClass="marquee-custom-style">
  <div class="item-1" #OmMarqueeContent>News Update 1</div>
  <div class="item-2" #OmMarqueeContent>News Update 2</div>
</om-marquee>
```

```css

.marquee-custom-style {
  background-color: #333;
  padding: 1rem;
  color: #fff;
}

.item-1 {
  font-size: 1.5rem;
  color: #ffcc00;
}

.item-2 {
  font-size: 1.5rem;
  color: #00ffcc;
}
```

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.