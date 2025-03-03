<template>
  <div class="row">
    <report-challenge-modal />
    <challenge-modal @updatedChallenge="updatedChallenge" />
    <leave-challenge-modal
      :challenge-id="challenge._id"
      @update-challenge="updateChallenge"
    />
    <close-challenge-modal
      :members="members"
      :challenge-id="challenge._id"
      :prize="challenge.prize"
      :flag-count="challenge.flagCount"
    />
    <challenge-member-progress-modal :challenge-id="challenge._id" />
    <div class="col-12 col-md-8 standard-page">
      <div class="row">
        <div class="col-12 col-md-6">
          <div
            v-if="canViewFlags"
            class="flagged"
          >
            <div
              v-if="flaggedNotHidden"
            >
              {{ $t("flaggedNotHidden") }}
            </div>
            <div
              v-else-if="flaggedAndHidden"
            >
              {{ $t("flaggedAndHidden") }}
            </div>
          </div>
          <h1 v-markdown="challenge.name"></h1>
          <div>
            <span class="mr-1 ml-0 d-block">
              <strong v-once>{{ $t('createdBy') }}:</strong>
              <span v-if="challenge.leader === null">
                {{ $t('noChallengeOwner') }}
              </span>
              <user-link
                v-else
                class="mx-1"
                :user="challenge.leader"
              />
            </span>
            <span
              v-if="challenge.group && challenge.group.name !== 'Tavern'"
              class="mr-1 ml-0 d-block"
            >
              <strong v-once>{{ $t(challenge.group.type) }}:</strong>
              <group-link
                class="mx-1"
                :group="challenge.group"
              />
            </span>
            <!-- @TODO: make challenge.author a variable inside the
             createdBy string (helps with RTL languages)-->
            <!-- @TODO: Implement in V2 strong.margin-left
            (v-once).svg-icon.calendar-icon(v-html="icons.calendarIcon")
            {{$t('endDate')}}
            // "endDate": "End Date: <% endDate %>",-->
            <!-- span {{challenge.endDate}}-->
          </div>
          <div class="tags">
            <span
              v-for="tag in challenge.tags"
              :key="tag"
              class="tag"
            >{{ tag }}</span>
          </div>
        </div>
        <div class="col-12 col-md-6 text-right">
          <div
            class="box member-count"
            @click="showMemberModal()"
          >
            <div
              class="svg-icon member-icon"
              v-html="icons.memberIcon"
            ></div>
            {{ challenge.memberCount }}
            <div
              v-once
              class="details"
            >
              {{ $t('participantsTitle') }}
            </div>
          </div>
          <div class="box">
            <div
              class="svg-icon gem-icon"
              v-html="icons.gemIcon"
            ></div>
            {{ challenge.prize || 0 }}
            <div
              v-once
              class="details"
            >
              {{ $t('prize') }}
            </div>
          </div>
        </div>
      </div>
      <div class="row challenge-actions">
        <div class="col-12 col-md-6">
          <strong class="view-progress">{{ $t('viewProgressOf') }}</strong>
          <member-search-dropdown
            :text="$t('selectParticipant')"
            :members="members"
            :challenge-id="challengeId"
            @member-selected="openMemberProgressModal"
            @opened="initialMembersLoad()"
          />
        </div>
        <div class="col-12 col-md-6 text-right">
          <span v-if="isLeader || isAdmin">
            <b-dropdown
              class="create-dropdown select-list"
              :text="$t('addTask')"
              :variant="'success'"
            >
              <b-dropdown-item
                v-for="type in columns"
                :key="type"
                class="selectListItem"
                @click="createTask(type)"
              >{{ $t(type) }}</b-dropdown-item>
            </b-dropdown>
            <task-modal
              ref="taskModal"
              :task="workingTask"
              :purpose="taskFormPurpose"
              :challenge-id="challengeId"
              @cancel="cancelTaskModal()"
              @taskCreated="taskCreated"
              @taskEdited="taskEdited"
              @taskDestroyed="taskDestroyed"
            />
          </span>
        </div>
      </div>
      <div class="row">
        <!-- eslint-disable vue/no-use-v-if-with-v-for -->
        <task-column
          v-for="column in columns"
          v-if="tasksByType[column].length > 0"
          :key="column"
          class="col-12 col-sm-6"
          :type="column"
          :task-list-override="tasksByType[column]"
          :challenge="challenge"
          :draggable-override="isLeader || isAdmin"
          @editTask="editTask"
          @taskDestroyed="taskDestroyed"
        />
        <!-- eslint-enable vue/no-use-v-if-with-v-for -->
      </div>
    </div>
    <div class="col-12 col-md-4 sidebar standard-page">
      <div
        v-if="canJoin"
        class="button-container"
      >
        <button
          v-once
          class="btn btn-success"
          @click="joinChallenge()"
        >
          {{ $t('joinChallenge') }}
        </button>
      </div>
      <div
        v-if="isLeader || isAdmin"
        class="button-container"
      >
        <button
          v-once
          class="btn btn-primary"
          @click="edit()"
        >
          {{ $t('editChallenge') }}
        </button>
      </div>
      <div
        v-if="isLeader || isAdmin"
        class="button-container"
      >
        <div>
          <button
            class="btn"
            :disabled="flaggedAndHidden"
            :class="flaggedAndHidden ? 'disabled btn-disabled' : 'btn-primary'"
            @click="cloneChallenge()"
          >
            {{ $t('clone') }}
          </button>
        </div>
      </div>
      <div
        v-if="isLeader || isAdmin"
        class="button-container"
      >
        <button
          v-once
          class="btn btn-primary"
          @click="exportChallengeCsv()"
        >
          {{ $t('exportChallengeCsv') }}
        </button>
      </div>
      <div
        v-if="isLeader || isAdmin"
        class="button-container"
      >
        <button
          v-once
          class="btn btn-danger"
          @click="closeChallenge()"
        >
          {{ $t('endChallenge') }}
        </button>
      </div>
      <div
        class="button-container"
      >
        <button
          v-once
          class="btn btn-danger"
          @click="reportChallenge()"
        >
          {{ $t('report') }}
        </button>
      </div>
      <div>
        <sidebar-section :title="$t('challengeSummary')">
          <p v-markdown="challenge.summary"></p>
        </sidebar-section>
        <sidebar-section :title="$t('challengeDescription')">
          <p v-markdown="challenge.description"></p>
        </sidebar-section>
      </div>
      <div
        v-if="isMember"
        class="text-center"
      >
        <button
          v-once
          class="btn btn-danger"
          @click="leaveChallenge()"
        >
          {{ $t('leaveChallenge') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
  @import '~@/assets/scss/colors.scss';

  h1 {
    color: $purple-200;
    margin-bottom: 8px;
  }

  .margin-left {
    margin-left: 1em;
  }

  span {
    margin-left: .5em;
  }

  .button-container {
    margin-bottom: 1em;

    button {
      width: 100%;
    }
  }

  .btn-disabled {
    background-color: $gray-700;
    color: $gray-50;
    box-shadow: none;
    cursor: arrow;

    &:hover {
      box-shadow: none;
    }
  }

  .calendar-icon {
    width: 12px;
    display: inline-block;
    margin-right: .2em;
  }

  .tags {
    margin-top: 1em;
  }

  .tag {
    border-radius: 30px;
    background-color: $gray-600;
    padding: .5em;
  }

  .sidebar {
    background-color: $gray-600;
  }

  .box {
    display: inline-block;
    padding: 1em;
    border-radius: 2px;
    background-color: $white;
    box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16), 0 1px 4px 0 rgba(26, 24, 29, 0.12);
    margin-left: 1em;
    width: 120px;
    height: 76px;
    text-align: center;
    font-size: 20px;
    vertical-align: bottom;

    &.member-count:hover {
      cursor: pointer;
    }

    .svg-icon {
      width: 30px;
      display: inline-block;
      margin-right: .2em;
      vertical-align: bottom;
    }

    .details {
      font-size: 12px;
      margin-top: 0.4em;
      color: $gray-200;
    }
  }

  .description-section {
    margin-top: 2em;
  }

  .challenge-actions {
    margin-top: 1em;
    margin-bottom: 2em;

    .view-progress {
      margin-right: .5em;
    }
  }

  .flagged {
    margin-left: 0em;
    color: $red-10;

    span {
      margin-left: 0em;
    }
  }
</style>

<script>
import Vue from 'vue';
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';
import { v4 as uuid } from 'uuid';

import { userStateMixin } from '../../mixins/userState';
import externalLinks from '../../mixins/externalLinks';
import memberSearchDropdown from '@/components/members/memberSearchDropdown';
import closeChallengeModal from './closeChallengeModal';
import Column from '../tasks/column';
import TaskModal from '../tasks/taskModal';
import markdownDirective from '@/directives/markdown';
import challengeModal from './challengeModal';
import challengeMemberProgressModal from './challengeMemberProgressModal';
import challengeMemberSearchMixin from '@/mixins/challengeMemberSearch';
import leaveChallengeModal from './leaveChallengeModal';
import reportChallengeModal from './reportChallengeModal';
import sidebarSection from '../sidebarSection';
import userLink from '../userLink';
import groupLink from '../groupLink';
import taskDefaults from '@/../../common/script/libs/taskDefaults';

import gemIcon from '@/assets/svg/gem.svg';
import memberIcon from '@/assets/svg/member-icon.svg';
import calendarIcon from '@/assets/svg/calendar.svg';

const TASK_KEYS_TO_REMOVE = ['_id', 'completed', 'date', 'dateCompleted', 'history', 'id', 'streak', 'createdAt', 'challenge'];

export default {
  directives: {
    markdown: markdownDirective,
  },
  components: {
    closeChallengeModal,
    leaveChallengeModal,
    reportChallengeModal,
    challengeModal,
    challengeMemberProgressModal,
    memberSearchDropdown,
    sidebarSection,
    TaskColumn: Column,
    TaskModal,
    userLink,
    groupLink,
  },
  mixins: [challengeMemberSearchMixin, externalLinks, userStateMixin],
  props: ['challengeId'],
  data () {
    return {
      searchId: '',
      columns: ['habit', 'daily', 'todo', 'reward'],
      icons: Object.freeze({
        gemIcon,
        memberIcon,
        calendarIcon,
      }),
      challenge: {},
      members: [],
      membersLoaded: false,
      tasksByType: {
        habit: [],
        daily: [],
        todo: [],
        reward: [],
      },
      editingTask: {},
      creatingTask: {},
      workingTask: {},
      taskFormPurpose: 'create',
      searchTerm: '',
      memberResults: [],
    };
  },
  computed: {
    isMember () {
      return this.user.challenges.indexOf(this.challenge._id) !== -1;
    },
    isLeader () {
      if (!this.challenge.leader) return false;
      return this.user._id === this.challenge.leader._id;
    },
    isAdmin () {
      return this.hasPermission(this.user, 'challengeAdmin');
    },
    canJoin () {
      return !this.isMember;
    },
    // canViewFlags should allow only moderators/admins to see flags
    canViewFlags () {
      const isModerator = this.hasPermission(this.user, 'moderator');
      if (isModerator && this.challenge.flagCount > 0) return true;
      return false;
    },
    // flaggedNotHidden should allow mods/admins & challenge owner to see flags
    flaggedNotHidden () {
      return this.challenge.flagCount === 1;
    },
    // flaggedAndHidden should only allow admin to see challenge & flags
    flaggedAndHidden () {
      return this.challenge.flagCount > 1;
    },
  },
  watch: {
    'challenge.name': {
      handler (newVal) {
        this.$store.dispatch('common:setTitle', {
          section: this.$t('challenge'),
          subSection: newVal.name,
        });
      },
    },
  },
  mounted () {
    if (!this.searchId) this.searchId = this.challengeId;
    if (!this.challenge._id) this.loadChallenge();
    this.handleExternalLinks();
  },
  updated () {
    this.handleExternalLinks();
  },
  async beforeRouteUpdate (to, from, next) {
    this.searchId = to.params.challengeId;
    await this.loadChallenge();
    next();
  },
  methods: {
    cleanUpTask (task) {
      const cleansedTask = omit(task, TASK_KEYS_TO_REMOVE);

      // Copy checklists but reset to uncomplete and assign new id
      if (!cleansedTask.checklist) cleansedTask.checklist = [];
      cleansedTask.checklist.forEach(item => {
        item.completed = false;
        item.id = uuid();
      });

      if (cleansedTask.type !== 'reward') {
        delete cleansedTask.value;
      }

      return cleansedTask;
    },
    async loadChallenge () {
      try {
        this.challenge = await this.$store.dispatch('challenges:getChallenge', { challengeId: this.searchId });
      } catch (e) {
        this.$router.push('/challenges/findChallenges');
        return;
      }
      this.$store.dispatch('common:setTitle', {
        subSection: this.challenge.name,
        section: this.$t('challenges'),
      });
      const tasks = await this.$store.dispatch('tasks:getChallengeTasks', { challengeId: this.searchId });
      this.tasksByType = {
        habit: [],
        daily: [],
        todo: [],
        reward: [],
      };
      tasks.forEach(task => {
        this.tasksByType[task.type].push(task);
      });
    },

    /**
     * Method for loading members of a group, with optional parameters for
     * modifying requests.
     *
     * @param {Object}  payload     Used for modifying requests for members
     */
    loadMembers (payload = null) {
      // Remove unnecessary data
      if (payload && payload.groupId) {
        delete payload.groupId;
      }
      return this.$store.dispatch('members:getChallengeMembers', payload);
    },
    initialMembersLoad () {
      this.$store.state.memberModalOptions.loading = true;
      if (!this.membersLoaded) {
        this.membersLoaded = true;

        this.loadMembers({
          challengeId: this.searchId,
          includeAllPublicFields: true,
        }).then(m => {
          this.members.push(...m);
          this.$store.state.memberModalOptions.loading = false;
        });
      } else {
        this.$store.state.memberModalOptions.loading = false;
      }
    },
    editTask (task) {
      this.taskFormPurpose = 'edit';
      this.editingTask = cloneDeep(task);
      this.workingTask = this.editingTask;
      // Necessary otherwise the first time the modal is not rendered
      Vue.nextTick(() => {
        this.$root.$emit('bv::show::modal', 'task-modal');
      });
    },
    createTask (type) {
      this.taskFormPurpose = 'create';
      this.creatingTask = taskDefaults({ type, text: '' }, this.user);
      this.workingTask = this.creatingTask;
      // Necessary otherwise the first time the modal is not rendered
      Vue.nextTick(() => {
        this.$root.$emit('bv::show::modal', 'task-modal');
      });
    },
    cancelTaskModal () {
      this.editingTask = null;
      this.creatingTask = null;
    },
    taskCreated (task) {
      this.tasksByType[task.type].unshift(task);
    },
    taskEdited (task) {
      const index = findIndex(this.tasksByType[task.type], taskItem => taskItem._id === task._id);
      this.tasksByType[task.type].splice(index, 1, task);
    },
    taskDestroyed (task) {
      const index = findIndex(this.tasksByType[task.type], taskItem => taskItem._id === task._id);
      this.tasksByType[task.type].splice(index, 1);
    },
    showMemberModal () {
      this.initialMembersLoad();

      this.$root.$emit('habitica:show-member-modal', {
        challengeId: this.challenge._id,
        groupId: 'challenge', // @TODO: change these terrible settings
        group: this.challenge.group,
        memberCount: this.challenge.memberCount,
        viewingMembers: this.members,
        fetchMoreMembers: this.loadMembers,
      });
    },
    async joinChallenge () {
      this.user.challenges.push(this.searchId);
      this.challenge = await this.$store.dispatch('challenges:joinChallenge', { challengeId: this.searchId });
      this.membersLoaded = false;
      this.members = [];

      await Promise.all([
        this.$store.dispatch('user:fetch', { forceLoad: true }),
        this.$store.dispatch('tasks:fetchUserTasks', { forceLoad: true }),
      ]);
    },
    async leaveChallenge () {
      this.$root.$emit('bv::show::modal', 'leave-challenge-modal');
    },
    async updateChallenge () {
      this.challenge = await this.$store.dispatch('challenges:getChallenge', { challengeId: this.searchId });
      this.membersLoaded = false;
      this.members = [];
    },
    closeChallenge () {
      this.initialMembersLoad();
      this.$root.$emit('bv::show::modal', 'close-challenge-modal');
    },
    edit () {
      this.$root.$emit('habitica:update-challenge', {
        challenge: this.challenge,
      });
    },
    // @TODO: view members
    updatedChallenge (eventData) {
      Object.assign(this.challenge, eventData.challenge);
    },
    openMemberProgressModal (member) {
      this.$root.$emit('habitica:challenge:member-progress', {
        progressMemberId: member._id,
        isLeader: this.isLeader,
        isAdmin: this.isAdmin,
      });
    },
    async exportChallengeCsv () {
      // let response = await this.$store.dispatch('challenges:exportChallengeCsv', {
      //   challengeId: this.searchId,
      // });
      window.location = `/api/v4/challenges/${this.searchId}/export/csv`;
    },
    cloneChallenge () {
      this.$root.$emit('habitica:clone-challenge', {
        challenge: this.challenge,
      });
    },
    reportChallenge () {
      this.$root.$emit('habitica::report-challenge', {
        challenge: this.challenge,
      });
    },
    async showCannotCloneModal () {
      this.$root.$emit('bv::show::modal', 'cannot-clone-modal');
    },
  },
};
</script>
