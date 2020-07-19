import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

import Cookies from "js-cookie";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  loadOrders,
  loadCustomers,
  loadSales,
  loadShippingMethod,
  getDeliveries,
  loadPaymentTypes,
  loadPaymentTerms,
} from "../../redux/orders/actions";

import {
  getWoodtypes,
  getAppliedMoulds,
  getBaseCap,
  getBaseboards,
  getCasings,
  getChairRails,
  getCopeDesigns,
  getCrownMouldings,
  getEdgeSlabs,
  getEdges,
  getFinish,
  getLites,
  get_Miter_DF_Designs,
  getMiterDesigns,
  getMouldingsLengths,
  getMTDesigns,
  get_MT_DF_Designs,
  getPanels,
  get_Plyths_Stools,
  getProfiles,
  getSolidCrowns,
  get_Wainscot_Beads,
  get_Face_Frame_Designs,
  get_Face_Frame_Top_Rails,
  getFurnitureFeet,
  getOnePieceWoodtypes,
  getOnePieceDesigns,
  getOnePiecePanels,
  getOnePieceEdges,

  getBoxBottomThickness,
  getBoxFinishes,
  getBoxNotches,
  getBoxThicknesses,
  getBoxWoodtypes,
  getBoxBottomWoodtypes,
  getBreakdowns,
  getBoxBreakdowns,
  getPricing
} from "../../redux/part_list/actions";
import { login, getUsers } from "../../redux/users/actions";

import Loader from '../../views/Admin/Loader/Loader'
import { NotificationContainer } from 'react-notifications';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

  componentDidMount = async () => {
    const props = this.props;
    const {
      getWoodtypes,
      getAppliedMoulds,
      getBaseCap,
      getBaseboards,
      getCasings,
      getChairRails,
      getCopeDesigns,
      getCrownMouldings,
      getEdgeSlabs,
      getEdges,
      getFinish,
      getLites,
      get_Miter_DF_Designs,
      getMiterDesigns,
      getMouldingsLengths,
      getMTDesigns,
      get_MT_DF_Designs,
      getPanels,
      get_Plyths_Stools,
      getProfiles,
      getSolidCrowns,
      get_Wainscot_Beads,
      get_Face_Frame_Designs,
      get_Face_Frame_Top_Rails,
      getFurnitureFeet,
      getOnePieceWoodtypes,
      getOnePieceDesigns,
      getOnePiecePanels,
      getOnePieceEdges,

      loadShippingMethod,
      loadPaymentTypes,
      loadPaymentTerms,

      getBoxBottomThickness,
      getBoxFinishes,
      getBoxNotches,
      getBoxThicknesses,
      getBoxWoodtypes,
      getBoxBottomWoodtypes,

      getBreakdowns,
      getBoxBreakdowns,

      getPricing,

      getUsers,

      login,
      loadSales,
      loadOrders,
      getDeliveries,

      loadedWoodtype,
      loadedAppliedMoulds,
      loadedBaseCaps,
      loadedBaseboards,
      loadedCasings,
      loadedChairRails,
      loadedCopeDesigns,
      loadedCrownMouldings,
      loadedEdgeSlabs,
      loadedEdges,
      loadedFinishes,
      loadedLites,
      loadedMiter_DF_Designs,
      loadedMiterDesigns,
      loadedMouldingsLengths,
      loaded_MT_Designs,
      loaded_MT_DF_Designs,
      loadedOrders,
      loadedPanels,
      loaded_Plynths_Stools,
      loadedProfiles,
      loadedSolidCrowns,
      loadedWainscotBeads,
      loadedFaceFrameDesigns,
      loadedFaceFrameTopRails,
      loadedFurnitureFeets,
      loadedOnePieceWoodtypes,
      loadedOnePieceDesigns,
      loadedOnePiecePanels,
      loadedOnePieceEdges,

      loadedBoxBottomThickness,
      loadedBoxFinish,
      loadedBoxNotches,
      loadedBoxThickness,
      loadedBoxWoodtypes,
      loadedBoxBottomWoodtypes,

      loadedBreakdowns,

      ordersDBLoaded,
      customerDBLoaded,

      loadedPaymentTypes,
      loadedPaymentTerms,
      loadedShippingMethods,
      loadedSales,

      loadedBoxBreakdowns,
      loadedPricing
    } = this.props;

    const cookie = await Cookies.get("jwt");

    if (cookie) {
      await login(cookie);
      await getUsers(cookie);

      if(!loadedSales){
        await loadSales(cookie);
      }
      

      if(!ordersDBLoaded){
        await loadOrders(cookie);
      }

      if(!customerDBLoaded){
        await loadCustomers(cookie);
      }

      if(!loadedPricing){
        await getPricing(cookie);
      }
      

      if(!loadedBreakdowns){
        await getBreakdowns(cookie);
      }
      
      if(!loadedBoxBreakdowns){
        await getBoxBreakdowns(cookie);
      }
      

      if(!loadedShippingMethods){
        await loadShippingMethod(cookie);
      }
      

      if(!loadedPaymentTypes){
        await loadPaymentTypes(cookie);
      }
     

      if(!loadedPaymentTerms){
        await loadPaymentTerms(cookie);
      }
      

      if(!loadedWoodtype){
        await getWoodtypes(cookie);
      }

      if(!loadedAppliedMoulds){
        await getAppliedMoulds(cookie);
      }

      if(!loadedBaseCaps){
        await getBaseCap(cookie);
      }

      if(!loadedBaseboards){
        await getBaseboards(cookie);
      }

      if(!loadedCasings){
        await getCasings(cookie);
      }

      if(!loadedChairRails){
        await getChairRails(cookie);
      }

      if(!loadedCopeDesigns){
        await getCopeDesigns(cookie);
      }

      if(!loadedCrownMouldings){
        await getCrownMouldings(cookie);
      }

      if(!loadedEdgeSlabs){
        await getEdgeSlabs(cookie);
      }

      if(!loadedEdges){
        await getEdges(cookie);
      }

      if(!loadedFinishes){
        await getFinish(cookie);
      }

      if(!loadedLites){
        await getLites(cookie);
      }

      if(!loadedMiter_DF_Designs){
        await get_Miter_DF_Designs(cookie);
      }

      if(!loadedMiterDesigns){
        await getMiterDesigns(cookie);
      }

      if(!loadedMouldingsLengths){
        await getMouldingsLengths(cookie);
      }

      if(!loaded_MT_Designs){
        await getMTDesigns(cookie);
      }

      if(!loaded_MT_DF_Designs){
        await get_MT_DF_Designs(cookie);
      }

      if(!loadedPanels){
        await getPanels(cookie);
      }

      if(!loaded_Plynths_Stools){
        await get_Plyths_Stools(cookie);
      }

      if(!loadedProfiles){
        await getProfiles(cookie);
      }

      if(!loadedSolidCrowns){
        await getSolidCrowns(cookie);
      }

      if(!loadedWainscotBeads){
        await get_Wainscot_Beads(cookie);
      }

      if(!loadedFaceFrameDesigns){
        await get_Face_Frame_Designs(cookie);
      }

      if(!loadedFaceFrameTopRails){
        await get_Face_Frame_Top_Rails(cookie);
      }

      if(!loadedFurnitureFeets){
        await getFurnitureFeet(cookie);
      }

      if(!loadedOnePieceWoodtypes){
        await getOnePieceWoodtypes(cookie);
      }

      if(!loadedOnePieceDesigns){
        await getOnePieceDesigns(cookie);
      }

      if(!loadedOnePiecePanels){
        await getOnePiecePanels(cookie);
      }

      if(!loadedOnePieceEdges){
        await getOnePieceEdges(cookie);
      }
      
      if(!loadedBoxBottomWoodtypes){
        await getBoxBottomWoodtypes(cookie);
      }

      if(!loadedBoxBottomThickness){
        await getBoxBottomThickness(cookie);
      }

      if(!loadedBoxFinish){
        await getBoxFinishes(cookie);
      }

      if(!loadedBoxNotches){
        await getBoxNotches(cookie);
      }

      if(!loadedBoxThickness){
        await getBoxThicknesses(cookie);
      }

      if(!loadedBoxWoodtypes){
        await getBoxWoodtypes(cookie);
      }

    } else {
      alert('not logged in')
    }

  }

  render() {


    if (
      !this.props.orders.length > 0
    ) {
      return <Loader />;
    } else {
      return (
        <div className="app">
          <NotificationContainer />
          <AppHeader fixed>
            <Suspense fallback={this.loading()}>
              <DefaultHeader />
            </Suspense>
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav navConfig={navigation} {...this.props} />
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
            <main className="main">
              <AppBreadcrumb appRoutes={routes} />
              <Container fluid>
                <Suspense fallback={this.loading()}>
                  <Switch>
                    {routes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => (
                            <route.component {...props} />
                          )} />
                      ) : (null);
                    })}
                    <Redirect from="/" to="/dashboard" />
                  </Switch>
                </Suspense>
              </Container>
            </main>
            <AppAside fixed>
              <Suspense fallback={this.loading()}>
                <DefaultAside />
              </Suspense>
            </AppAside>
          </div>
          <AppFooter>
            <Suspense fallback={this.loading()}>
              <DefaultFooter />
            </Suspense>
          </AppFooter>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, prop) => ({
  orders: state.Orders.orders,
  customerDBLoaded: state.Orders.customerDBLoaded,
  ordersDBLoaded: state.Orders.ordersDBLoaded,
  loggedIn: state.users.loggedIn,

  loadedWoodtype: state.part_list.loadedWoodtype,
  loadedAppliedMoulds: state.part_list.loadedAppliedMoulds,
  loadedBaseCaps: state.part_list.loadedBaseCaps,
  loadedBaseboards: state.part_list.loadedBaseboards,
  loadedCasings: state.part_list.loadedCasings,
  loadedChairRails: state.part_list.loadedChairRails,
  loadedCopeDesigns: state.part_list.loadedCopeDesigns,
  loadedCrownMouldings: state.part_list.loadedCrownMouldings,
  loadedEdgeSlabs: state.part_list.loadedEdgeSlabs,
  loadedEdges: state.part_list.loadedEdges,
  loadedFinishes: state.part_list.loadedFinishes,
  loadedLites: state.part_list.loadedLites,
  loadedMiter_DF_Designs: state.part_list.loadedMiter_DF_Designs,
  loadedMiterDesigns: state.part_list.loadedMiterDesigns,
  loadedMouldingsLengths: state.part_list.loadedMouldingsLengths,
  loaded_MT_Designs: state.part_list.loaded_MT_Designs,
  loaded_MT_DF_Designs: state.part_list.loaded_MT_DF_Designs,
  loadedOrders: state.part_list.loadedOrders,
  loadedPanels: state.part_list.loadedPanels,
  loaded_Plynths_Stools: state.part_list.loaded_Plynths_Stools,
  loadedProfiles: state.part_list.loadedProfiles,
  loadedSolidCrowns: state.part_list.loadedSolidCrowns,
  loadedWainscotBeads: state.part_list.loadedWainscotBeads,
  loadedFaceFrameDesigns: state.part_list.loadedFaceFrameDesigns,
  loadedFaceFrameTopRails: state.part_list.loadedFaceFrameTopRails,
  loadedFurnitureFeets: state.part_list.loadedFurnitureFeets,
  loadedOnePieceWoodtypes: state.part_list.loadedOnePieceWoodtypes,
  loadedOnePieceDesigns: state.part_list.loadedOnePieceDesigns,
  loadedOnePiecePanels: state.part_list.loadedOnePiecePanels,
  loadedOnePieceEdges: state.part_list.loadedOnePieceEdges,

  loadedBoxBottomThickness: state.part_list.loadedBoxBottomThickness,
  loadedBoxFinish: state.part_list.loadedBoxFinish,
  loadedBoxNotches: state.part_list.loadedBoxNotches,
  loadedBoxThickness: state.part_list.loadedBoxThickness,
  loadedBoxWoodtypes: state.part_list.loadedBoxWoodtypes,
  loadedBoxBottomWoodtypes: state.part_list.loadedBoxBottomWoodtypes,

  loadedBreakdowns: state.part_list.loadedBreakdowns,
  loadedBoxBreakdowns: state.part_list.loadedBoxBreakdowns,

  ordersDBLoaded: state.part_list.ordersDBLoaded,
  customerDBLoaded: state.part_list.customerDBLoaded,

  loadedPaymentTypes: state.Orders.loadedPaymentTypes,
  loadedPaymentTerms: state.Orders.loadedPaymentTerms,
  loadedShippingMethods: state.Orders.loadedShippingMethods,
  loadedSales: state.Orders.loadedSales,

  loadedBreakdowns: state.part_list.loadedBreakdowns,
  loadedBoxBreakdowns: state.part_list.loadedBoxBreakdowns,
  loadedPricing: state.part_list.loadedPricing
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadOrders,
      loadCustomers,
      loadSales,
      loadShippingMethod,

      getWoodtypes,
      getAppliedMoulds,
      getBaseCap,
      getBaseboards,
      getCasings,
      getChairRails,
      getCopeDesigns,
      getCrownMouldings,
      getEdgeSlabs,
      getEdges,
      getFinish,
      getLites,
      get_Miter_DF_Designs,
      getMiterDesigns,
      getMouldingsLengths,
      getMTDesigns,
      get_MT_DF_Designs,
      getPanels,
      get_Plyths_Stools,
      getProfiles,
      getSolidCrowns,
      get_Wainscot_Beads,
      get_Face_Frame_Designs,
      get_Face_Frame_Top_Rails,
      getFurnitureFeet,
      getOnePieceWoodtypes,
      getOnePieceDesigns,
      getOnePiecePanels,
      getOnePieceEdges,
      getBoxBottomWoodtypes,
      getBoxBottomThickness,
      getBoxFinishes,
      getBoxNotches,
      getBoxThicknesses,
      getBoxWoodtypes,
      getDeliveries,

      getBreakdowns,
      getBoxBreakdowns,

      getPricing,
      getUsers,
      loadPaymentTypes,
      loadPaymentTerms,


      login,
      // getBoxThickness,
      // getBoxBottoms,
      // getAssembly,
      // getNotch,
      // getDrawerFinish,
      // getDoorExtras,
      // getDoorOptions






    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout);

