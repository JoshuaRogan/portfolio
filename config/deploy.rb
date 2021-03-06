# config valid only for current version of Capistrano
lock '3.4.1'

set :application, 'portfolio'
set :repo_url, 'git@github.com:JoshuaRogan/portfolio.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug, TRACE, INFO, IMPORTANT
set :log_level, :INFO

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Copy node_modules for faster deploys 
set :copy_files, ['node_modules', 'bower_components']

namespace :deploy do

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end

## Local Build
namespace :deploy do
  desc 'Upload files that are built on the local machine'
  task :upload do 
    on roles(:all) do |server|
      print "\nBuilding Gulp for production\n"
      # Run NPM Install, Bower Install then gulp
      run_local("gulp --production")
      print "\nUploading files\n"
      upload! "app/_site/", "#{fetch(:upload_to)}/releases/#{fetch(:release_timestamp)}/app/_site/", recursive: true
    end
  end
end
after 'deploy:updated', 'deploy:upload'



## Server Build
namespace :deploy do
  desc 'Production build all assets on remote server'
  task :build do
    on roles(:all) do
    	within release_path do
          execute :gulp, '--production'
	    end
    end
  end
end
# after 'deploy:updated', 'deploy:build'


def run_local(cmd)
  system cmd
  if($?.exitstatus != 0) then
    puts 'Failed System Command: Exit Code: ' + $?.exitstatus.to_s
    exit
  end
end
