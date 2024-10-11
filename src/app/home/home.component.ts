import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  provideHighlightOptions,
  Highlight,
  HighlightAuto,
} from 'ngx-highlightjs';
import 'highlight.js/styles/androidstudio.min.css';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { NgClass, NgIf } from '@angular/common';
interface formAngsuran {
  price: number,
  downPayment: number,
  timePeriod: number
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Highlight, HighlightAuto, HighlightLineNumbers , ReactiveFormsModule , NgIf , CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  angsuranForm: FormGroup | any;
  formSubmitted: boolean = false;
  angsuranBulanan:  number | null = null;

  constructor(
    private fb: FormBuilder,
  ) { }

  async ngOnInit() {
    // this.highlightCode();
    this.angsuranForm = this.fb.group({
      price: ['240000000',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10)
        ]
      ],
      downPayment: ['20',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10)
        ]
      ],
      timePeriod: ['10',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10)
        ]
      ],
    });

  }
  codeForHighlight: string = `
  const angsuran = (harga_mobil , persen_dp , waktu) => {
    const OTR = harga_mobil;
    const dp = OTR * persen_dp / 100;
    const jangka_waktu = waktu;

    if(jangka_waktu <= 12) {
        bunga = 0.12
    } else if( jangka_waktu > 12 && jangka_waktu <= 24) {
        bunga = 0.14
    } else {
        bunga = 0.165
    }

    const pokok_utang = OTR - dp;
    const angsuran_bulanan = (pokok_utang + (pokok_utang * bunga)) / jangka_waktu;
    console.log(angsuran_bulanan);
}

const harga_mobil = 240_000_000;
const persen_dp = 20;
const jangka_waktu = 10;

angsuran(harga_mobil , persen_dp , jangka_waktu);
`;


  codex : string = ''

  angsuran(harga_mobil:number, persen_dp:number, waktu:number) {
    const OTR = harga_mobil;
    const dp = OTR * persen_dp / 100;
    const jangka_waktu = waktu;

    let bunga;

    if(jangka_waktu <= 12) {
        bunga = 0.12
    } else if( jangka_waktu > 12 && jangka_waktu <= 24) {
        bunga = 0.14
    } else {
        bunga = 0.165
    }

    const pokok_utang = OTR - dp;
    this.angsuranBulanan = (pokok_utang + (pokok_utang * bunga)) / jangka_waktu;
    console.log(this.angsuranBulanan)
  }

  onSubmit(): void {
    this.formSubmitted = true;
    const formData: formAngsuran = this.angsuranForm.value;
    // console.log(formData.price)
    // console.log(formData.downPayment)
    // console.log(formData.timePeriod)


    if (this.angsuranForm.valid) {
      console.log(formData);
      this.angsuran( formData.price, formData.downPayment, formData.timePeriod);
    }
}

}
