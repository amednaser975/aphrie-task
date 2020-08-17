import { Component, OnInit } from '@angular/core';
import { TestimonialsService } from './testimonials.service';
import { Testimonials } from '../_models/testimonials';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  testimonials: Testimonials[];
  constructor(public _testimonials: TestimonialsService) { 
    
  }

  ngOnInit(): void {
    
    this._testimonials.getTestimonials().subscribe(
      (results) => {
        this.testimonials = results.data; 
      } 
    );

    // Sync Navbar Links with Sections
    $(window).scroll(function() {
      let navHeight = $("#mainNav").innerHeight();
      $(".block").each(function() {
        if ($(window).scrollTop() + (navHeight + 20) > $(this).offset().top) {
          var blockID = $(this).attr("id");
          $(".navbar li").removeClass("active");
          $(".navbar li a[data-scroll='" + blockID + "']").parent().addClass("active");
        }
      });

      // Change Coloring Properties of Navbar On Scrolling
      if ($(window).scrollTop() >= 40) {
        $(".navbar").css({
          boxShadow: "0px 6px 9px 0px rgba(0,0,0,.1)"
        });
      } else {
        $(".navbar").css({
          boxShadow: "none"
        });
      }
    });
    $('.nav-item').click(function () {

      let linkHref = $(this).find('.nav-link').attr('href');
      let sectionOffset = $(linkHref).offset().top - 80;
      console.log(sectionOffset)
      $('html, body').animate({scrollTop: sectionOffset}, 1000);
      var arr = $('.nav-item');
      arr.forEach = Array.prototype.forEach;
      arr.forEach(function(ele){
        ele.classList.remove('active');
      })
      $(this).addClass('active');
    
    })

     // Toggler Button
     if(window.innerWidth < 992)
     {
       $('.nav-item').on('click', function () {
   
         $('#navbarSupportedContent').removeClass('show');
       })
     }

    // Scroll To Top button
    let scrollToTop = $(".back-to-top");
    $(window).scroll(function() {
      if ($(window).scrollTop() >= 800) {
        if (scrollToTop.is(":hidden")) {
          scrollToTop.css("display", "block");
        }
      } else {
        scrollToTop.css("display", "none");
      }
    });

    // Click On scrollToTop To Go Up 
    scrollToTop.click(function(event) {
      event.preventDefault();
      $("html , body").animate(
        {
          scrollTop: 0
        },
        1000
      );
    });

    // Portfolio Shuffle
   $('.port-category').on('click', function() {

    $(this).addClass('active').siblings().removeClass('active');

    if ($(this).data('class') === '.all') {

        $('.port-item').css('display','block');

    } else {

        $('.port-item').css('display','none');
        $($(this).data('class')).css('display','block');
    }

   });
  }

}
