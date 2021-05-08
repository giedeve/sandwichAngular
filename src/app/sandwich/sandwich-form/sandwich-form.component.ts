import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient, Sauce } from '../sandwich';
import { SandwichService } from '../sandwich.service';

@Component({
  selector: 'wsb-sandwich-form',
  templateUrl: './sandwich-form.component.html',
  styleUrls: ['./sandwich-form.component.css']
})
export class SandwichFormComponent implements OnInit {

  sandwichForm: FormGroup;

  showErrors: boolean = false;

  sauces = [
    { label: "Barbeque sauce", value: Sauce.None },
    { label: "Mustard sauce", value: Sauce.Mustard },
    { label: "Mayonnaise sauce", value: Sauce.Mayo },
    { label: "Barbeque sauce", value: Sauce.Bbq },
  ];

  constructor(private formBuilder: FormBuilder, private SandwichService: SandwichService) {

  }

  public ngOnInit(): void {
    this.sandwichForm = this.formBuilder.group({
      name: ['', [Validators.minLength(5), Validators.maxLength(20)]],
      ingredients: this.formBuilder.group({
        [Ingredient.Cheese]: false,
        [Ingredient.Chorizo]: false,
        [Ingredient.Ham]: false,
        [Ingredient.Lettuce]: false,
        [Ingredient.Tomato]: false
      }),
      sauce: Sauce.Bbq,
      vege: false,
      price: [0, Validators.max(20)]
    });
  }

  mapIngredienrs(ingredients: object) {
    return Object.entries(ingredients)
      .filter((ingredient) => ingredient[1])
      .map(ingredient => ingredient[0]);
  }

  save(): void {
    this.showErrors = true;
    if (this.sandwichForm.valid) {
      const formValue = this.sandwichForm.getRawValue();
      const checkedIngredients = this.mapIngredienrs(formValue.ingredients);
      const sandwich = { ...formValue, ingredients: checkedIngredients };
      this.SandwichService.postSandwich(sandwich)
        .then(() => console.info("Kanapka została zapisana"))
        .catch(() => console.error("Wystąpił błąd"));
    }
  }

}
