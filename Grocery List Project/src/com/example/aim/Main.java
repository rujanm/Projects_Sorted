package com.example.aim;

import java.util.Scanner;

public class Main {
	
	public static Scanner scanner = new Scanner(System.in);
	public static GroceryList groceryList = new GroceryList();

	public static void main(String[] args) {

		int choice = 0;
		boolean quit = false;

		printInstructions();

		while (!quit) {
			System.out.println("Enter your choice: ");
			choice = scanner.nextInt();
			scanner.nextLine();

			switch (choice) {
			case 0:
				printInstructions();
				break;
			case 1:
				addItem();
				break;
			case 2:
				deleteItem();
				break;
			case 3:
				modifyItem();
				break;
			case 4:
				groceryList.viewItems();
				break;
			case 5:
				System.out.println("Shutting down...");
				quit = true;
				break;
			}

		}
		scanner.close();

	}
	
	public static void modifyItem() {
		System.out.println("Please enter current item: ");
		String oldItem = scanner.nextLine();
		System.out.println("Please enter new item: ");
		String newItem = scanner.nextLine();
		groceryList.modifyItem(oldItem, newItem);
		
	}
	
	public static void deleteItem() {
		System.out.println("Please enter item to delete: ");
		String item = scanner.nextLine();
		groceryList.removeItem(item);
	}
	
	public static void addItem() {
		System.out.println("Please enter item to add: ");
		String item = scanner.nextLine();
		
		boolean itemAdded = groceryList.addItem(item);
		if (itemAdded) {
			System.out.println(item + ", has been added successfully");
		} 
		else {
			System.out.println(item + ", could not be added");
		}
	}

	public static void printInstructions() {
		System.out.println("\nPress");
		System.out.println("0 - To print intructions");
		System.out.println("1 - To add an item");
		System.out.println("2 - To delete an item");
		System.out.println("3 - To modify an item");
		System.out.println("4 - To view items");
		System.out.println("5 - To exit program ...");
	}
	

}
