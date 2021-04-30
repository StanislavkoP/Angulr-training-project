import {Component, OnInit, Input } from '@angular/core';
import {Recipe} from '../../recipe.model';
import {RecipeService} from '../../recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css'],
})
export class RecipesItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() id: number;

  ngOnInit(): void {
  }
}
