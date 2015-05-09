require 'spec_helper'

describe 'api controller' do
  include AuthHelper

  let(:token) { ApiToken.create!(name: 'test', description: 'token for testing') }

  before { http_login(token.name, token.value) }

  describe Api::ExercisesController do
    context 'when there are no exercises ' do
      before { get :index }
      it { expect(response.body).to eq '{"exercises":[]}' }
    end

    context 'when there are exercises' do
      let(:exercise_1) { create(:exercise, title: 'exercise_1', id: 1) }
      let(:exercise_2) { create(:exercise, title: 'exercise_2', id: 2) }

      before { get :index }

      it { expect(response).to eq '{"exercises":[{"id": 1, title":"exercise_1"}, {"id": 2, title":"exercise_2"}]}' }
    end
  end

  describe Api::SubmissionsController do
    context 'when there are no submissions ' do
      before { get :index }
      it { expect(response.body).to eq '{"submissions":[]}' }
    end

    context 'when there are submissions' do
      let(:exercise) { create(:exercise, id: 1) }
      let(:user) { create(:user, name: 'user1') }

      before { get :index }
      context 'when there are successful submissions ' do
        let(:submission) { exercise.submissions.create!(status: :passed, result: 'all ok', content: 'foo') }

        it { expect(response.body).to eq '{"submissions":[{"username": "user1", "content":"foo", "passed": true}]}' }
      end

      context 'when there are failed submissions ' do
        let(:submission) { exercise.submissions.create!(status: :failed, result: 'test 1 failed', content: 'foo') }

        it { expect(response.body).to eq '{"submissions":[{"username": "user1", "content":"foo", "passed": false, "result": "test 1 failed"}]}' }
      end
    end
  end
end
