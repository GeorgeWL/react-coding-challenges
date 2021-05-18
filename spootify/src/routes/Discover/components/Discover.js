import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import makeRequest from "../api/makeRequest";
import "../styles/_discover.scss";

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
    console.log({ responseCategories });
    const newReleases = responseNewReleases?.data;
    const newPlaylists = responsePlaylists?.data;
    const categories = responseCategories?.data;
    console.log({
      newReleases,
      newPlaylists,
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
