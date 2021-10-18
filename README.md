# Homepage

The homepage was built using [Jekyll](https://jekyllrb.com/) and uploaded on Github pages.

## Running

1. Clone the repository
2. Make sure you have ruby-dev, bundler, and nodejs installed: `sudo apt install ruby-dev ruby-bundler nodejs`
3. Run `bundle clean` to clean up the directory (no need to run `--force`)
4. Run `bundle install` to install ruby dependencies. If you get errors, delete Gemfile.lock and try again.
5. Run `bundle exec jekyll serve` to generate the HTML and serve it from localhost:4000

## Updating

To update all gems, run:

```code
bundle update --all
```
