class ListsController < ApplicationController
  before_action :set_board
  before_action :set_list, only: [:show, :update, :destroy]

  def index
    @lists = @board.lists
  end

  def show
  end

  def create
    @list = @board.lists.new(list_params)
    if @list.save
      render :list
    else
      render json: { errors: @list.errors.full_messages }, status: 401
    end
  end

  def update
    if @list.update(list_params)
      render :list
    else
      render json: { errors: @list.errors.full_messages }, status: 401
    end
  end

  def destroy
    @list.destroy
    head :ok
  end


  private

  def list_params
    params.require(:list).permit(:title)
  end

  def set_board
    @board = current_user.boards.find(params[:board_id])
  end

  def set_list
    @list = @board.lists.find(params[:id])
  end

end
