import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SandwichService } from '../sandwich.service';

@Component({
  selector: 'wsb-sandwich-details',
  templateUrl: './sandwich-details.component.html',
  styles: [
  ]
})
export class SandwichDetailsComponent implements OnInit {

  public sandwichId = this.activatedRoute.snapshot.params.id;

  public sandwichDetails = this.sandwichService.getSandwich(this.sandwichId);

  constructor(private activatedRoute: ActivatedRoute, private sandwichService: SandwichService) { }

  ngOnInit(): void {
  }

}
