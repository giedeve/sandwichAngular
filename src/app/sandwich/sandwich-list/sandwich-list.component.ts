import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SandwichService } from '../sandwich.service';

@Component({
  selector: 'wsb-sandwich-list',
  templateUrl: './sandwich-list.component.html'
})
export class SandwichListComponent implements OnInit {
  public sandwiches = this.sandwichService.getSandwiches();

  public searchForm: FormGroup;
  
  constructor(
    private sandwichService: SandwichService,
    private formBuilder: FormBuilder
    ) { }

  public ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      query: '',
      sort: 'name',
      order: 'asc'
    });
  }

  public find() {
    const { query, sort, order } = this.searchForm.getRawValue();
    console.log(query, sort, order)
    this.sandwiches = this.sandwichService.findSandwiches(query, sort, order);
  }

}
