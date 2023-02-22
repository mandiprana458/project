import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';
import { Location } from '@angular/common';
import html2canvas from 'html2canvas';
import htmlToPdfmake from "html-to-pdfmake"
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';

const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-preview-report',
  templateUrl: './preview-report.component.html',
  styleUrls: ['./preview-report.component.css']
})
export class PreviewReportComponent implements OnInit {

  reportID: any
  reviewData: any
  org_type: any
  exportData: any[] = [];
  @ViewChild('submittedContent') pdfElement: ElementRef;

  constructor(public service: CommonServiceService, public spinner: NgxSpinnerService,
    public helperService: HelperService, public router: Router, public route: ActivatedRoute, public _location: Location) { }


  ngOnInit(): void {
    this.reportID = this.route.snapshot.paramMap.get('id')
    this.org_type = localStorage.getItem("organisationType")
    this.getReportDetails()
  }

  printThisPage() {
    let mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function (mql) {
      if (mql.matches) {
        console.log('before print dialog open');
      } else {
        console.log('after print dialog closed');
      }
    });
    window.print();
  }

  printSelectedData() {
    this.exportData = []
    this.exportData.push([{ text: 'Sl. No', bold: true }, { text: 'Name', bold: true }, { text: 'Ritwik Name', bold: true }, { text: 'Guardian Name', bold: true }, { text: 'Address', bold: true }])
    this.generateHTMLTOPDFWithoutHeaders()
  }

  async onGeneratePDF() {
    const reviewData = this.reviewData
    let docDefinition;
    document.getElementById('submitted-content').setAttribute("style", "height: 1200px;");
    html2canvas(document.getElementById('submitted-content'), { scrollY: window.scrollY }).then(function (canvas) {
      var data = canvas.toDataURL();
      docDefinition = {
        permissions: {
          printing: 'highResolution', //'lowResolution'
        },
        footer: function (currentPage: { toString: () => string; }, pageCount: string) {
          return {
            alignment: 'center',
            text: currentPage.toString() + ' of ' + pageCount + '',
            fontSize: 12,
            bold: true
          }
        },
        header: () => {
          return {
            margin: 25,
            marginBottom: 10,
            background: '#FF8200',
            color: 'white',
            alignment: 'center',
            text: `REPORT SUBMITTED BY ${reviewData.createdByFullName.toUpperCase()} ON ${new Date(reviewData.createdAt).toUTCString().substring(0, new Date(reviewData.createdAt).toUTCString().length - 3)}`,
            fontSize: 12,
            bold: true
          }
        },
        content: [{
          layout: 'lightHorizontalLines', // optional
          image: data,
          width: 500
        }]
      };
      pdfMake.createPdf(docDefinition).open();
    })

  }

  async onGenerateHTMPTOPDF() {
    const reviewData = this.reviewData
    let ret = htmlToPdfmake(document.getElementById('submitted-content').outerHTML, {
      imagesByReference: true
    });
    console.log(ret)

    let docDefinition = {
      permissions: {
        printing: 'highResolution', //'lowResolution'
        modifying: false,
        copying: false,
        annotating: false,
        contentAccessibility: false,
      },
      footer: function (currentPage: { toString: () => string; }, pageCount: string) {
        return {
          alignment: 'center',
          text: currentPage.toString() + ' of ' + pageCount + '',
          fontSize: 12,
          bold: true
        }
      },
      header: () => {
        return {
          margin: 25,
          marginBottom: 10,
          background: '#FF8200',
          color: 'white',
          alignment: 'center',
          text: `REPORT SUBMITTED BY ${reviewData.createdByFullName.toUpperCase()} ON ${new Date(reviewData.createdAt).toUTCString().substring(0, new Date(reviewData.createdAt).toUTCString().length - 3)}`,
          fontSize: 12,
          bold: true
        }
      },
      content: ret.content
    };
    console.log(docDefinition)
    pdfMake.createPdf(docDefinition).print();
  }

  async onGenerateHTMLTOPDF() {
    const doc = new jsPDF();

    const pdfTable = this.pdfElement.nativeElement;

    var html = htmlToPdfmake(pdfTable.innerHTML);

    const reviewData = this.reviewData
    // let ret = htmlToPdfmake(document.getElementById('submitted-content').outerHTML, {
    //   imagesByReference: true
    // });
    // console.log(ret)

    let docDefinition = {
      permissions: {
        printing: 'highResolution', //'lowResolution'
        modifying: false,
        copying: false,
        annotating: false,
        contentAccessibility: false,
      },
      footer: function (currentPage: { toString: () => string; }, pageCount: string) {
        return {
          alignment: 'center',
          text: currentPage.toString() + ' of ' + pageCount + '',
          fontSize: 12,
          bold: true
        }
      },
      header: () => {
        return {
          margin: 25,
          marginBottom: 10,
          background: '#FF8200',
          color: 'white',
          alignment: 'center',
          text: `REPORT SUBMITTED BY ${reviewData.createdByFullName.toUpperCase()} ON ${new Date(reviewData.createdAt).toUTCString().substring(0, new Date(reviewData.createdAt).toUTCString().length - 3)}`,
          fontSize: 12,
          bold: true
        }
      },
      content: html
    };
    console.log(docDefinition)
    pdfMake.createPdf(docDefinition).open();
  }

  async generateHTMLTOPDFWithoutHeaders() {
    const reviewData = this.reviewData
    var element = document.getElementById('submitted-content');
    let opt = {
      margin: [25, 10, 15, 10],
      fileName: "myreport",
      image: { type: 'jpeg', quality: 1 },
      pagebreak: { before: '.page-break', avoid: 'table' },
      html2canvas: { dpi: 72, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
      const base64Img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZ0AAAHoCAYAAACSMDLQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozYTRiMGE1Yi0zMDVlLTkzNDAtOWExNy1lNzI3MDFiMmNlZDkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDg0RjM2RkVBMjM0MTFFQ0E1MENFRkFDQ0U4ODlBOUUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDg0RjM2RkRBMjM0MTFFQ0E1MENFRkFDQ0U4ODlBOUUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmU3NDM1NDdmLWEwOWQtODc0ZC05NzcwLTZmZTZiZjM0NzEyZCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmQ1NWY0MjRmLWQzMjAtZjE0Ni05NzU2LWZh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'
      for (let i = 1; i <= 1; i++) {
        pdf.setPage(i);
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.addImage(base64Img, 'JPEG', 95, 2, 12, 12);
        pdf.text(10, 18, `REPORT SUBMITTED BY ${reviewData.createdByFullName.toUpperCase()} ON ${new Date(reviewData.createdAt).toUTCString().substring(0, new Date(reviewData.createdAt).toUTCString().length - 3)}`);
        const textWidth = pdf.getTextWidth(`REPORT SUBMITTED BY ${reviewData.createdByFullName.toUpperCase()} ON ${new Date(reviewData.createdAt).toUTCString().substring(0, new Date(reviewData.createdAt).toUTCString().length - 3)}`);
        pdf.line(0, 0, textWidth, 0)
      }
    }).output('dataurlnewwindow');
  }

  getReportDetails() {
    this.spinner.show()
    this.service.getAPICall({ url: '/organisation/reports/' + this.reportID }).subscribe((res) => {
      this.spinner.hide()
      if (res.status == 200) {
        res.data[0].incidentDate = (new Date(res.data[0].incidentDate).getTime())
        res.data[0].incidentTimeString = this.service.formatTime(res.data[0].incidentHours, res.data[0].incidentMinutes)
        this.reviewData = res.data[0]
        console.log(this.reviewData)
      }
    }, (err) => {
      this.spinner.hide()
      this.helperService.showError(err.message)
    })
  }

  onClickBack() {
    this._location.back()
  }

}
