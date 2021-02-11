# Porta Door Co. Inc.

This application is intended for company office use only.

**File Structure:**

	 

	 └── src
		 └── assets
		 └── components
			 └── DoorOrders
				 └── _test_
				 └── DoorInfo
					 └── _test_
					 └── Cope
						 └── DF.js
						 └── Door.js
					 └── Face_Frame
						 └── FaceFrame.js
					 └── Filter
						 └── Filter.js
					 └── Glass
						 └── Cope
							 └── DF.js
							 └── Door.js
						 └── Miter
							 └── DF.js
							 └── Door.js
						 └── MT
							 └── DF.js
							 └── Door.js
						 └── Glass_DF.js
						 └── Glass_Door.js
					 └── Miter
						 └── DF.js
						 └── Door.js
					 └── MT
						 └── DF.js
						 └── Door.js
					 └── Slab_Door
						 └── Slab_DF.js
						 └── Slab_Door.js
					 └── Condtionals.js
					 └── DoorInfo.js
				 └── MakerJS
					 └── Door.js
					 └── Maker.js
				 └── SideBar
					 └── Cope
						 └── DF.js
						 └── Door.js
					 └── Glass
						 └── DF.js
						 └── Door.js
					 └── Miter
						 └── DF.js
						 └── Door.js
					 └── MT
						 └── DF.js
						 └── Door.js
					 └── One_Piece
						 └── Door.js
				 └── Table
					 └── DFs
						 └── Glass
							 └── Cope_Table.js
							 └── Miter_Table.js
							 └── MT_Table.js
						 └── Cope_Table.js
						 └── Glass_Table.js
						 └── Miter_Table.js
						 └── MT_Table.js
					 └── Doors
						 └── Glass
							 └── Cope_Table.js
							 └── Miter_Table.js
							 └── MT_Table.js
						 └── Cope_Table.js
						 └── Frame_Only_Table.js
						 └── Glass_Table.js
						 └── Miter_Table.js
						 └── MT_Table.js
						 └── One_Piece_Table.js
						 └── Slab_Door_Table.js
					 └── Warnings
						 └── Modal.js
				 └── MiscItems.js
				 └── SideBar.js
			 └── DrawerOrders
				 └── DrawerBoxInfo.js
				 └── MiscItems.js
				 └── OrderTable.js
				 └── SideBar.js
			 └── FileUploader
				 └── FileUploader.js
			 └── JobInfo
				 └── DrawerJobInfo.js
				 └── JobInfo.js
				 └── MiscJobInfo.js
				 └── MouldingJobInfo.js
			 └── RenderInputs
				 └── renderInputs.js
				 └── RenderPriceHolder.js
		 └── containers
			 └── DefaultLayout
				 └── DefaultAside.js
				 └── DefaultFooter.js
				 └── DefaultHeader.js
				 └── DefaultHeaderDropdown.js
				 └── DefaultLayout.js
				 └── index.js
				 └── package.json
			 └── index.js
		 └── redux
			 └── customers
				 └── actions.js
				 └── reducer.js
			 └── misc_items
				 └── actions.js
				 └── reducer.js
			 └── orders
				 └── actions.js
				 └── reducer
			 └── part_list
				 └── actions.js
				 └── reducer.js
			 └── sales
				 └── actions.js
				 └── reducer.js	
			 └── users
				 └── actions.js
				 └── reducer.js
			 └── db_url.js
		 └── scss
			 └── vendors
				 └── _variables.scss
				 └── .gitkeep
			 └── _custom.scss
			 └── _fixes.scss
			 └── _ie-fix.scss
			 └── _variables.scss
			 └── style.scss
		 └── selectors
			 └── breakdowns.js
			 └── doorPricing.js
			 └── drawerPricing.js
			 └── miscItemPricing.js
			 └── mouldingPricing.js
		 └── utils
			 └── auth.js
			 └── errorHandle.js
		 └── views
			 └── Admin
				 └── Catalog
					 └── Catalog.js
				 └── CRM
					 └── column.js
					 └── data.json
					 └── initial-data.js
					 └── Leads.js
					 └── task.js
				 └── Customers
					 └── AddCustomer
						 └── dropdowns.js
						 └── package.json
						 └── states.js
					 └── Customers
						 └── components
							 └── CompanyOrders.js
							 └── Edit.js
							 └── Maps.js
							 └── NewCustomer.js
							 └── Notes_Table.js
							 └── Notes.js
						 └── AddCustomer.js
						 └── CompanyTable.js
						 └── CustomerPage.js
						 └── package.json
				 └── Dashboard
					 └── components
						 └── Chart1.js
						 └── Chart2.js
						 └── Chart3.js
						 └── Chart4.js
						 └── Maps.js
						 └── OrderTable.js
					 └── Dashboard.js
					 └── Dashboard.test.js
					 └── package.json
				 └── DoorOrders
					 └── _test_
					 └── DoorOrders.js
					 └── package.json
				 └── DrawerOrders
					 └── _test_
					 └── DrawerOrder.js
					 └── package.json
				 └── Late_List
					 └── Late_list.js
				 └── Loader
					 └── Loader.js
				 └── MiscItems
					 └── _tests_
					 └── components
						 └── Inputs.js
						 └── MiscItemsComponent.js
					 └── MiscItems.js
				 └── Mouldings
					 └── _tests_
					 └── components
						 └── Inputs.js
						 └── MouldingsComponents.js
					 └── Mouldings.js
					 └── styles.js
				 └── Orders
					 └── _test_
					 └── Balance
						 └── Door_Order
							 └── Balance.js
							 └── BalanceHistory.js
						 └── Drawer_Order
							 └── Balance.js
							 └── BalanceHistory.js
						 └── MiscItems
							 └── Balance.js
							 └── BalanceHistory.js
						 └── Mouldings
							 └── Balance.js
							 └── BalanceHistory.js
						 └── Balance.js
					 └── MiscItems
						 └── DoorMiscItems.js
						 └── DrawerMiscItems.js
						 └── MouldingsMiscItems.js
					 └── Notes
						 └── DoorOrder
							 └── Conversation_Notes.js
							 └── Notes_Table.js
						 └── DrawerOrder
							 └── Conversation_Notes.js
							 └── Notes_Table.js
						 └── MiscItems
							 └── Conversation_Notes.js
							 └── Notes_Table.js
						 └── Mouldings
							 └── Conversation_Notes.js
							 └── Notes_Table.js
					 └── PrintOuts
						 └── Breakdowns
							 └── Doors
								 └── MaterialBreakdown
									 └── BoardFT.js
									 └── LinearFT.js
									 └── LinearIN.js
									 └── PanelBoardFT.js
									 └── SqFT.js
									 └── TotalPieces.js
								 └── Panels
									 └── designs
										 └── Cope
											 └── Cope_DF.js
											 └── Cope_Door.js
										 └── Face_Frame
											 └── Face_Frame.js
										 └── Glass
											 └── Glass.js
										 └── Miter
											 └── Miter_DF.js
											 └── Miter_Door.js
										 └── MT
											 └── MT_DF.js
											 └── MT_Door.js
										 └── One_Piece_Door
											 └── One_Piece_Door.js
										 └── Slab_Door
											 └── Slab_Door.js
									 └── Panels.js
								 └── Rails
									 └── designs
										 └── Cope
											 └── Cope_DF.js
											 └── Cope_Door.js
										 └── Face_Frame
											 └── Face_Frame.js
										 └── Glass
											 └── Glass.js
										 └── Miter
											 └── Miter_DF.js
											 └── Miter_Door.js
										 └── MT
											 └── MT_DF.js
											 └── MT_Door.js
										 └── One_Piece_Door
											 └── One_Piece_Door.js
										 └── Slab_Door
											 └── Slab_Door.js
									 └── Rails.js
								 └── Stiles
									 └── designs
										 └── Cope
											 └── Cope_DF.js
											 └── Cope_Door.js
										 └── Face_Frame
											 └── Face_Frame.js
										 └── Glass
											 └── Glass.js
										 └── Miter
											 └── Miter_DF.js
											 └── Miter_Door.js
										 └── MT
											 └── MT_DF.js
											 └── MT_Door.js
										 └── One_Piece_Door
											 └── One_Piece_Door.js
										 └── Slab_Door
											 └── Slab_Door.js
									 └── Stiles.js
								 └── frac2dec.js
								 └── Size.js
								 └── SlabSize.js
							 └── DrawerBoxes
								 └── Bottoms.js
								 └── Fronts.js
								 └── LinearFT.js
								 └── LinearIN.js
								 └── Sides.js
								 └── Size.js
								 └── SQFT.js
						 └── Door_PDF
							 └── Individual
								 └── Acknowledgement.js
								 └── AssemblyList.js
								 └── Invoice.js
								 └── MaterialsList.js
								 └── PanelsPage.js
								 └── Profiles.js
								 └── QC_Checklist.js
								 └── RailsPage.js
								 └── StilesPage.js
							 └── Acknowledgement.js
							 └── AssemblyList.js
							 └── Invoice.js
							 └── MaterialsList.js
							 └── PanelsPage.js
							 └── Profiles.js
							 └── QC_Checklist.js
							 └── RailsPage.js
							 └── StilesPage.js
						 └── Drawer_PDF
							 └── Individual
								 └── Acknowledgement.js
								 └── AssemblyList.js
								 └── Bottoms.js
								 └── Invoice.js
								 └── Sides.js
							 └── Acknowledgement.js
							 └── AssemblyList.js
							 └── Bottoms.js
							 └── Invoice.js
							 └── Sides.js
						 └── Misc_Items_PDF
							 └── Individual
								 └── Acknowledgement.js
								 └── Invoice.js
							 └── Acknowledgement.js
							 └── Invoice.js
						 └── Mouldings_PDF
							 └── Individual
								 └── Acknowledgement.js
								 └── Invoice.js
							 └── Acknowledgement.js
							 └── Invoice.js
						 └── Pages
							 └── Door
								 └── AcknowledgementPDF.js
								 └── AssemblyPDF.js
								 └── CustomerCopyPDF.js
								 └── DoorPDF.js
								 └── InvoicePDF.js
								 └── MaterialsPDF.js
								 └── PanelsPDF.js
								 └── ProfilesPDF.js
								 └── QCPDF.js
								 └── RailsPDF.js
								 └── StilesPDF.js
							 └── Drawer
								 └── AcknowledgementPDF.js
								 └── AssemblyListPDF.js
								 └── BottomsPDF.js
								 └── CustomerCopyPDF.js
								 └── DrawerPDF.js
								 └── InvoicePDF.js
								 └── SidesPDF.js
							 └── MiscItems
								 └── AcknowledgementPDF.js
								 └── InvoicePDF.js
								 └── MiscItemsPDF.js
							 └── Mouldings
								 └── AcknowledgementPDF.js
								 └── InvoicePDF.js
								 └── MouldingsPDF.js
						 └── Reports
							 └── Components
								 └── Orders.js
								 └── Salesmen.js
							 └── Report1.js
							 └── SalesmenReport.js
					 └── SelectedOrder
						 └── DoorOrders
							 └── _test_
							 └── DoorOrders.js
							 └── package.json
						 └── DrawerOrders
							 └── _test_
							 └── DrawerOrders.js
							 └── package.json
						 └── MiscItems
							 └── Inputs
							 └── MiscItemsComponent.js
						 └── Mouldings
							 └── Inputs
							 └── MouldingsComponent.js
						 └── EditSelectedOrder.js
					 └── OrderPage.js
					 └── OrderTable.js
					 └── package.json
				 └── PurchaseOrders
					 └── package.json
					 └── PurchaseOrders.js
				 └── SalesReport
					 └── _test
					 └── components
						 └── _test_
						 └── SalesCharts
							 └── Chart1.js
							 └── Chart2.js
							 └── Chart3.js
							 └── Chart4.js
							 └── Maps.js
						 └── Chart.js
						 └── StatusTable.js
					 └── package.json
					 └── SalesReport.js
				 └── Settings
					 └── _test_
					 └── components
						 └── _test_
						 └── Card.js
						 └── FileUploader.js
					 └── img
						 └── df.png
						 └── door.png
						 └── DrawerBox.png
						 └── Products.psd
					 └── Pricing
						 └── Door
							 └── _test_
							 └── editor
								 └── Editor.js
								 └── EditorPage.js
								 └── Parameters.js
							 └── DoorPricing.js
						 └── DrawerBox
							 └── _test_
							 └── editor
								 └── Editor.js
								 └── EditorPage.js
								 └── Parameters.js
							 └── DrawerPricing.js
						 └── FaceFrame
							 └── _test_
							 └── editor
								 └── Editor.js
								 └── EditorPage.js
								 └── Parameters.js
							 └── FaceFrame.js
					 └── Printing
						 └── Printer_Settings.js
					 └── Products
						 └── Door
							 └── _test_
							 └── Attributes
								 └── _test_
								 └── Applied_Profiles.js
								 └── Edges.js
								 └── Panels.js
								 └── Profiles.js
								 └── Woodtypes.js
							 └── Cope
								 └── _test_
								 └── attributes
									 └── Designs.js
								 └── editor
									 └── Editor.js
									 └── EditorPage.js
									 └── Parameters.js
								 └── img
								 └── Cope.js
							 └── img
							 └── Miter
								 └── _test_
								 └── attributes
									 └── Designs.js
								 └── editor
									 └── Editor.js
									 └── EditorPage.js
									 └── Parameters.js
								 └── img
								 └── Miter.js
							 └── MT
								 └── _test_
								 └── attributes
									 └── Designs.js
								 └── editor
									 └── Editor.js
									 └── EditorPage.js
									 └── Parameters.js
								 └── img
								 └── MT.js
							 └── One_Piece_Door
								 └── _test_
								 └── attributes
									 └── Designs.js
								 └── editor
									 └── Editor.js
									 └── EditorPage.js
									 └── Parameters.js
								 └── img
								 └── One_Piece.js
							 └── Slab_Type_Door
								 └── _test_
								 └── attributes
									 └── Designs.js
								 └── editor
									 └── Editor.js
									 └── EditorPage.js
									 └── Parameters.js
								 └── img
								 └── Slab.js
							 └── DoorSelection.js
						 └── DrawerBox
								 └── _test_
								 └── attributes
									 └── BoxBottomThickness.js
									 └── BoxBottomWoodtype.js
									 └── BoxScoops.js
									 └── BoxThickness.js
									 └── Finish.js
									 └── NotchDrill.js
									 └── Woodtypes.js
								 └── editor
									 └── Editor.js
									 └── EditorPage.js
									 └── Parameters.js
								 └── img
								 └── DrawerBox.js
						 └── DrawerFront
							 └── _test_
							 └── Attributes
								 └── _test_
								 └── Designs.js
								 └── Profiles.js
							 └── Cope
								 └── _test_
								 └── attributes
									 └── Designs.js
								 └── editor
									 └── Editor.js
									 └── EditorPage.js
									 └── Parameters.js
								 └── img
								 └── Cope.js
							 └── img
							 └── Miter
								 └── _test_
								 └── attributes
									 └── Designs.js
								 └── editor
									 └── Editor.js
									 └── EditorPage.js
									 └── Parameters.js
								 └── img
								 └── Miter.js
							 └── MT
								 └── _test_
								 └── attributes
									 └── Designs.js
								 └── editor
									 └── Editor.js
									 └── EditorPage.js
									 └── Parameters.js
								 └── img
								 └── MT.js
							 └── DFSelection.js
						 └── FaceFrame
								 └── _test_
								 └── attributes
									 └── Designs.js
									 └── Furniture_Feet.js
									 └── TopRailDesign.js
								 └── editor
									 └── Editor.js
									 └── EditorPage.js
									 └── Parameters.js
								 └── img
								 └── FaceFrame.js
						 └── MiscItems
							 └── _test_
							 └── attributes
								 └── Designs.js
							 └── Misc_Items.js
						 └── Mouldings
							 └── Base_Cap
								 └── _test_
								 └── attributes
									 └── Designs.js
								 └── Base_Cap.js
							 └── Baseboard
								 └── _test_
								 └── attributes
									 └── Designs.js
								 └── Baseboard.js
							 └── Casings
								 └── _test_
								 └── attributes
									 └── Designs.js
								 └── Casings.js
							 └── Chair_Rails
								 └── _test_
								 └── attributes
									 └── Designs.js
								 └── Chair_Rails.js
							 └── Crown_Mouldings
								 └── _test_
								 └── attributes
									 └── Designs.js
								 └── Crown_Mouldings.js
							 └── Flat_Stock
								 └── _test_
								 └── attributes
									 └── Designs.js
								 └── Flat_Stock.js
							 └── Solid_Crowns
								 └── _test_
								 └── attributes
									 └── Designs.js
								 └── Solid_Crowns.js
					 └── AccountSettings.js
					 └── DeleteModal.js
					 └── LogOutModal.js
					 └── package.json
					 └── Selection.js
					 └── Settings.js
				 └── Tasks
					 └── actions
						 └── index.js
					 └── components
						 └── ToDoApp.js
						 └── TodoForm.js
						 └── ToDoHeader.js
						 └── TodoList.js
						 └── TodoListItem.js
					 └── reducers
						 └── index.js
						 └── todos.js
						 └── visibilityFilter.js
					 └── Task.js
				 └── Tracking
					 └── _test_
					 └── components
						 └── _test_
						 └── Chart.js
						 └── StatusTable.js
					 └── package.json
					 └── Tracking.js
				 └── Users
					 └── _test_
					 └── Users.js
			 └── Pages
				 └── Login
					 └── Login.js
					 └── package.json
				 └── NewPassword	
					 └── NewPassword.js
				 └── Page404
					 └── Page404.js
					 └── package.json
				 └── Page500
					 └── Page500.js
					 └── package.json
				 └── Register
					 └── Register.js
					 └── package.json
				 └── index.js
		 └── _nav.js
		 └── App.js
		 └── App.scss
		 └── App.test.js
		 └── index.css
		 └── polyfill.js
		 └── rootReducer.js
		 └── routes.js
		 └── serviceWorker.js
		 └── setupTests.js

