package com.example.aim;

import java.util.ArrayList;

public class GroceryList {
	
	public ArrayList<String> groceryList = new ArrayList<String>();
	
	
	// add Items
	public boolean addItem(String item) {
		if (!groceryList.contains(item)) {
			
			return groceryList.add(item);
		} 
		else {
			return false;
		}
	}
	
	
	// method to view items
	public void viewItems() {
		System.out.println("There are: " + groceryList.size() + " items in your list.");
		
		for (int i =0; i < groceryList.size(); i++) {
			System.out.println((i + 1) + ". " + groceryList.get(i));
		}
	}
	
	
	
	// class method to delete items
	public void removeItem(String item) {
		// get the index (position) of our item in the list
		int position = findItem(item);
		
		// check if the item exists or not.
		if (position >= 0) {
			removeGroceryItem(position);
			System.out.println(item + " has been removed successfully.");
		}
		else {
			System.out.println(item + " was not found.");
		}
	}
	
	// actual method to handle the remove
	private void removeGroceryItem(int position) {
		groceryList.remove(position);
	}
	
	// helper method to find the index of the item.
	private int findItem(String searchItem) {
		return groceryList.indexOf(searchItem);
	}
	
	
	public void modifyItem(String currentItem, String newItem) {
		int position = findItem(currentItem);
		if (position >= 0) {
			modifyGroceryItem(position, newItem);
		}
		else {
			System.out.println("update unsuccessful " + currentItem + "was not found");
		}
		
	}
	
	private void modifyGroceryItem(int position, String newItem) {
		groceryList.set(position, newItem);
	}
	
	
	
	
	
}





