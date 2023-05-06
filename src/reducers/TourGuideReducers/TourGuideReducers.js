import {
 TOUR_GUIDE_ADD_REQUEST,
 TOUR_GUIDE_ADD_SUCCESS,
 TOUR_GUIDE_ADD_FAIL,
 TOUR_GUIDE_VIEW_REQUEST,
 TOUR_GUIDE_VIEW_SUCCESS,
 TOUR_GUIDE_VIEW_FAIL,
 TOUR_GUIDE_UPDATE_REQUEST,
 TOUR_GUIDE_UPDATE_SUCCESS,
 TOUR_GUIDE_UPDATE_FAIL,
 TOUR_GUIDE_DELETE_REQUEST,
 TOUR_GUIDE_DELETE_SUCCESS,
 TOUR_GUIDE_DELETE_FAIL 
} from "../../constants/TourGuideConstants/TourGuideConstants";


export const GuideAddReducer = (state = {}, action) => {
	switch (action.type) {
		case TOUR_GUIDE_ADD_REQUEST:
			return { loading: true };
		case TOUR_GUIDE_ADD_SUCCESS:
			return { loading: false, success: true };
		case TOUR_GUIDE_ADD_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const GuideViewListReducer = (state = { Guides: [] }, action) => {
	switch (action.type) {
		case TOUR_GUIDE_VIEW_REQUEST:
			return { loading: true };
		case TOUR_GUIDE_VIEW_SUCCESS:
			return { loading: false, Guides: action.payload };
		case TOUR_GUIDE_VIEW_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const CustomerGuideViewListReducer = (state = { Guides: [] }, action) => {
	switch (action.type) {
		case TOUR_GUIDE_VIEW_REQUEST:
			return { loading: true };
		case TOUR_GUIDE_VIEW_SUCCESS:
			return { loading: false, Guides: action.payload };
		case TOUR_GUIDE_VIEW_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const GuideUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case TOUR_GUIDE_UPDATE_REQUEST:
			return { loading: true };
		case TOUR_GUIDE_UPDATE_SUCCESS:
			return { loading: false, adminInfo: action.payload, success: true };
		case TOUR_GUIDE_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const GuideDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case TOUR_GUIDE_DELETE_REQUEST:
			return { loading: true };
		case TOUR_GUIDE_DELETE_SUCCESS:
			return { loading: false, adminInfo: action.payload, success: true };
		case TOUR_GUIDE_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};