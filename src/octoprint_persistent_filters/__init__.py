import octoprint.plugin


class PersistentFiltersPlugin(
    octoprint.plugin.AssetPlugin,
):

    # Assets

    def get_assets(self):
        return dict(
            js=["dist/persistent_filters.js"],
        )

    # SoftwareUpdate

    def get_update_information(self):
        return {
            "persistent_filters": {
                "displayName": self._plugin_name,
                "displayVersion": self._plugin_version,

                # version check: github repository
                "type": "github_release",
                "user": "malnvenshorn",
                "repo": "octoprint-persistentfilters",
                "current": self._plugin_version,

                # update method: pip
                "pip": "https://github.com/malnvenshorn/octoprint-persistentfilters/archive/{target_version}.zip",
            },
        }


__plugin_name__ = "Persistent Filters"

__plugin_pythoncompat__ = ">=3.7"

__plugin_implementation__ = PersistentFiltersPlugin()

__plugin_hooks__ = {
    "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
}
