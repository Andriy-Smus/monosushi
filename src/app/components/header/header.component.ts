import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isActive = false;

  activeList() {
    this.isActive = !this.isActive;
  }

  isScrolled = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0; // Перевіряємо, чи сторінка прокручена вгору
    this.toggleShadowClass(); // Викликаємо метод для зміни класу з тінню
  }

  toggleShadowClass() {
    if (this.isScrolled) {
      this.renderer.addClass(this.elementRef.nativeElement, 'with-shadow'); // Додаємо клас з тінню
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'with-shadow'); // Видаляємо клас з тінню
    }
  }

  ngOnInit(): void {
  }

}
