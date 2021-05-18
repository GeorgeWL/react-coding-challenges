import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import makeRequest from "../api/makeRequest";
import "../styles/_discover.scss";
// if had time I'd probably refactor this into fucntional rather than class-based
// possibly with a useReducer
export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }
  async componentDidMount() {
    const responseNewReleases = await makeRequest("new-releases").catch(
      (err) => {
        console.error(err);
      }
    );
    const responsePlaylists = await makeRequest("featured-playlists").catch(
      (err) => {
        console.error(err);
      }
    );
    const responseCategories = await makeRequest("categories").catch((err) => {
      console.error(err);
    });
    // As ui already has css for loading items, should be fine to load all in on mount
    // could for design purposes only stagger the loading, but that should be handled with animation delay in css
    const newReleases = responseNewReleases?.data?.albums?.items;
    const playlists = responsePlaylists?.data?.playlists?.items;
    const categories = responseCategories?.data?.categories?.items;
    this.setState({
      newReleases,
      playlists,
      categories
    });
  }
  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
